# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest `main` branch | Yes |
| Older commits | No |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email **rishi.banerjee1@gmail.com** with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. You will receive an acknowledgment within 48 hours
4. A fix will be prioritized based on severity

## Security Practices

| Area | Practice |
|------|----------|
| API Keys | Stored in `.env.local`, never committed to git |
| Dependencies | Monitored via GitHub Dependabot alerts |
| AI Requests | Server-side only via Next.js Server Actions — API keys never reach the client |
| User Input | Validated and sanitized before AI prompt injection |
| Document Uploads | Parsed client-side only (Mammoth, pdf.js) — files are never sent to external servers |
| Storage | IndexedDB data stays local to the browser — no telemetry or external sync |
| Offline | Service worker caches only app assets, not user data |

## Dependency Security

This project uses GitHub Dependabot to monitor dependency vulnerabilities. Critical and high severity alerts are addressed within 7 days.

To check the current status:
```bash
npm audit
```

## Scope

The following are **in scope** for security reports:
- XSS, CSRF, or injection vulnerabilities in the web application
- API key exposure or leakage
- Insecure data handling or storage
- Dependency vulnerabilities with exploitable attack vectors

The following are **out of scope**:
- Rate limiting on the Gemini API (handled by Google)
- Denial of service via excessive document uploads (client-side only)
- Social engineering attacks
