# Testing Checklist

## Automated Testing Requirements

### ✅ 1. /healthz returns 200
- **Route:** `GET /healthz`
- **File:** `app/healthz/route.js`
- **Status:** Returns 200 (default for NextResponse.json)
- **Response:** `{ "ok": true, "version": "1.0", "uptime": seconds }`
- **Test:** `curl http://localhost:3000/healthz` or visit in browser

### ✅ 2. Creating a link works; duplicate codes return 409
- **Route:** `POST /api/links`
- **File:** `app/api/links/route.js`
- **Functionality:**
  - Creates link with auto-generated code if no custom code provided
  - Creates link with custom code if provided (6-8 alphanumeric)
  - Returns 409 if custom code already exists
  - Returns 400 for invalid URL or code format
- **Test Cases:**
  - POST with valid URL → 201 Created
  - POST with duplicate custom code → 409 Conflict
  - POST with invalid URL → 400 Bad Request
  - POST with invalid code format → 400 Bad Request

### ✅ 3. Redirect works and increments click count
- **Route:** `GET /:code`
- **File:** `app/[code]/route.js`
- **Functionality:**
  - Returns 302 redirect to target URL if link exists
  - Increments `click_count` on each redirect
  - Updates `last_clicked_at` timestamp
  - Returns 404 if link not found
- **Test Cases:**
  - Visit `/{code}` with valid code → 302 redirect
  - Check click_count increases in database
  - Check last_clicked_at updates
  - Visit `/{code}` with invalid code → 404

### ✅ 4. Deletion stops redirect (404)
- **Route:** `DELETE /api/links/:code`
- **File:** `app/api/links/[code]/route.js`
- **Functionality:**
  - Deletes link from database
  - Returns 404 if link not found
  - After deletion, visiting `/{code}` returns 404
- **Test Cases:**
  - DELETE existing link → 200 Success
  - Visit `/{code}` after deletion → 404 Not Found
  - DELETE non-existent link → 404 Not Found

### ✅ 5. UI meets expectations
- **Layout & Hierarchy:** ✓ Clear structure, readable typography, sensible spacing
- **States:** ✓ Empty, loading, success, and error states
- **Form UX:** ✓ Inline validation, friendly error messages, disabled submit during loading, visible confirmation on success
- **Tables:** ✓ Sort/filter, truncate long URLs with ellipsis, functional copy buttons
- **Consistency:** ✓ Shared header/footer, uniform button styles, consistent formatting
- **Responsiveness:** ✓ Layout adapts gracefully to narrow screens
- **Polish:** ✓ Minimal but complete; no raw unfinished HTML

## Manual Testing Guide

### Test 1: Health Check
```bash
curl http://localhost:3000/healthz
# Expected: {"ok":true,"version":"1.0","uptime":123}
```

### Test 2: Create Link
```bash
# Create with auto-generated code
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Create with custom code
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}'

# Try duplicate code (should return 409)
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}'
```

### Test 3: Redirect and Click Tracking
```bash
# Visit short link (replace {code} with actual code)
curl -I http://localhost:3000/{code}
# Expected: HTTP/1.1 302 Found
# Check Location header points to target URL

# Check click count increased
curl http://localhost:3000/api/links/{code}
```

### Test 4: Delete Link
```bash
# Delete link
curl -X DELETE http://localhost:3000/api/links/{code}

# Try to visit deleted link (should return 404)
curl -I http://localhost:3000/{code}
# Expected: HTTP/1.1 404 Not Found
```

### Test 5: UI Testing
1. **Dashboard:**
   - Create a link via form
   - Search/filter links
   - Sort table columns
   - Delete a link
   - Test on mobile/resize browser

2. **Stats Page:**
   - Click "View Stats" on a link
   - Verify all information displays correctly
   - Test copy buttons

3. **Responsiveness:**
   - Resize browser window
   - Test on mobile viewport
   - Verify table scrolls horizontally on small screens

## All Requirements Met ✅

All automated and manual testing requirements are implemented and ready for testing.


