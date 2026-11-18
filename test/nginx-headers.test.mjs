import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const conf = readFileSync(new URL('../nginx.conf', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
// Blok per scope: server-niveau en de cache-location (nginx erft add_header niet naar een location met eigen add_header)
const locStart = conf.indexOf('location ~*')
const scopes = { server: conf.slice(0, locStart), cachelocatie: conf.slice(locStart) }

describe('beveiligingskoppen landing', () => {
  const controleer = (tekst) => {
    assert.match(tekst, /add_header Content-Security-Policy "[^"]*frame-ancestors 'none'/)
    assert.match(tekst, /add_header Content-Security-Policy "[^"]*script-src 'self'(;|")/)
    assert.match(tekst, /add_header X-Content-Type-Options "nosniff" always/)
    assert.match(tekst, /add_header X-Frame-Options "DENY" always/)
  }

  test('aanval: framing, sniffing en vreemde scripts worden geweigerd (server)', () => {
    controleer(scopes.server)
  })

  test('aanval: framing, sniffing en vreemde scripts worden geweigerd (cachelocatie)', () => {
    controleer(scopes.cachelocatie)
  })

  test('weg: eigen script, stijl, lettertypen en afbeeldingen blijven toegestaan', () => {
    const csp = conf.match(/Content-Security-Policy "([^"]*)"/)[1]
    assert.match(csp, /default-src 'self'/)
    assert.match(csp, /style-src 'self' 'unsafe-inline'/)
    assert.match(csp, /font-src 'self' data:/)
    assert.match(csp, /img-src 'self' data:/)
    // de pagina heeft geen inline scripts, dus script-src 'self' breekt niets
    const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>/g)]
    assert.equal(inline.length, 0)
    assert.match(conf, /Strict-Transport-Security/)
  })
})
