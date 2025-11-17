# Airtable Data Structure Guide

This document describes the data structure required for each Airtable table used in the migrated React TypeScript application.

## 📋 Tables Overview

| Table Name              | Purpose                   | Status         |
| ----------------------- | ------------------------- | -------------- |
| `about-us`              | About Us page content     | ✅ Configured  |
| `promotion`             | Campaign/promotion banner | ⚠️ Needs setup |
| `home_banner` or `home` | Home page banner slider   | ⚠️ Needs setup |
| `services`              | Services page data        | ⚠️ Needs setup |
| `gallery`               | Gallery page images       | ⚠️ Needs setup |

---

## 1. `about-us` Table ✅

**Status:** Already configured and working

### Fields

| Field Name        | Type             | Required    | Description          |
| ----------------- | ---------------- | ----------- | -------------------- |
| `description`     | Long Text        | ✅ Yes      | Main content text    |
| `icon`            | Attachment       | ⚠️ Optional | Icon image (SVG/PNG) |
| `logo`            | Attachment       | ⚠️ Optional | Logo watermark image |
| `backgroundColor` | Single Line Text | ⚠️ Optional | CSS color (hex/rgba) |

### Example Record

```json
{
  "description": "Our team of experienced technicians...",
  "icon": [{ "url": "https://..." }],
  "logo": [{ "url": "https://..." }],
  "backgroundColor": "#ffeed6cc"
}
```

---

## 2. `promotion` Table

**Purpose:** Campaign banner at top of header

### Fields

| Field Name   | Type             | Required    | Description                 |
| ------------ | ---------------- | ----------- | --------------------------- |
| `enabled`    | Checkbox         | ✅ Yes      | Whether promotion is active |
| `start_date` | Number           | ✅ Yes      | Unix timestamp (seconds)    |
| `end_date`   | Number           | ✅ Yes      | Unix timestamp (seconds)    |
| `title`      | Single Line Text | ✅ Yes      | Campaign text to display    |
| `icon`       | Attachment       | ⚠️ Optional | Campaign icon (for popup)   |

### Example Record

```json
{
  "enabled": true,
  "start_date": 1704067200,
  "end_date": 1735689600,
  "title": "GIFT CARDS ARE AVAILABLE FOR PURCHASE IN-STORE ONLY",
  "icon": [{ "url": "https://..." }]
}
```

### Notes

- Promotion shows in header banner if:
  - `enabled` = true
  - Current time is between `start_date` and `end_date`
  - User hasn't closed it (stored in sessionStorage)

---

## 3. `home_banner` or `home` Table

**Purpose:** Home page banner slider and gallery

### Option A: Single `home` Table

If using a single table, structure should be:

| Field Name     | Type                 | Required    | Description             |
| -------------- | -------------------- | ----------- | ----------------------- |
| `banner`       | Multiple Attachments | ⚠️ Optional | Array of banner items   |
| `home_gallery` | Multiple Attachments | ⚠️ Optional | Array of gallery items  |
| `promotion`    | Linked Record        | ⚠️ Optional | Link to promotion table |

**Note:** This requires complex data structure. Recommended: Use separate tables.

### Option B: Separate Tables (Recommended)

#### 3a. `banner` Table

| Field Name | Type       | Required    | Description          |
| ---------- | ---------- | ----------- | -------------------- |
| `desktop`  | Attachment | ✅ Yes      | Desktop banner image |
| `mobile`   | Attachment | ✅ Yes      | Mobile banner image  |
| `order`    | Number     | ⚠️ Optional | Display order        |

### Example Record

```json
{
  "desktop": [{ "url": "https://.../home-1.jpg" }],
  "mobile": [{ "url": "https://.../home-mb-1.jpg" }],
  "order": 1
}
```

#### 3b. `home_gallery` Table

| Field Name    | Type             | Required    | Description       |
| ------------- | ---------------- | ----------- | ----------------- |
| `url`         | Attachment       | ✅ Yes      | Gallery image     |
| `description` | Single Line Text | ⚠️ Optional | Image description |

### Example Record

```json
{
  "url": [{ "url": "https://.../gallery-1.jpg" }],
  "description": "Beautiful nail art design"
}
```

---

## 4. `services` Table

**Purpose:** Services page - service items with prices and icons

### Fields

| Field Name        | Type             | Required    | Description                                                                                             |
| ----------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `name` or `title` | Single Line Text | ✅ Yes      | Service name                                                                                            |
| `category`        | Single Select    | ✅ Yes      | Category: `manicure`, `pedicure`, `nails-enhancements`, `additional-services`, `waxing`, `kid-services` |
| `price` or `cost` | Number           | ⚠️ Optional | Service price (number)                                                                                  |
| `subtitle`        | Single Line Text | ⚠️ Optional | Short description                                                                                       |
| `description`     | Long Text        | ⚠️ Optional | Full description                                                                                        |
| `icon`            | Attachment       | ⚠️ Optional | Service icon image                                                                                      |
| `image`           | Attachment       | ⚠️ Optional | Service thumbnail                                                                                       |
| `addons`          | Long Text        | ⚠️ Optional | Add-on services text                                                                                    |

### Category Values

Must match exactly (case-insensitive):

- `manicure`
- `pedicure`
- `nails-enhancements`
- `additional-services`
- `waxing`
- `kid-services`

### Example Record

```json
{
  "name": "Dip Powder on Real Nails",
  "category": "manicure",
  "price": 52,
  "subtitle": "Beautiful dip powder manicure",
  "description": "Full description here...",
  "icon": [{ "url": "https://..." }],
  "addons": "Specialty shapes: +$5 / Additional length: +$5"
}
```

### Notes

- Component groups services by `category`
- Services without category won't appear
- Price can be number or string (e.g., "$52+" or 52)

---

## 5. `gallery` Table

**Purpose:** Gallery page images with categories

### Fields

| Field Name    | Type             | Required    | Description                                                   |
| ------------- | ---------------- | ----------- | ------------------------------------------------------------- |
| `url`         | Attachment       | ✅ Yes      | Gallery image                                                 |
| `description` | Single Line Text | ⚠️ Optional | Image description                                             |
| `category`    | Single Select    | ⚠️ Optional | Category: `nail_lounge`, `nail_art`, or leave empty for "All" |

### Category Values

- `nail_lounge` → Shows in "Our Nail Lounge" filter
- `nail_art` → Shows in "Our Nail Art" filter
- Empty or other → Shows in "All" filter

### Example Record

```json
{
  "url": [{ "url": "https://.../gallery-1.jpg" }],
  "description": "Beautiful nail art design",
  "category": "nail_art"
}
```

---

## 🔧 Setup Instructions

### Step 1: Create Tables in Airtable

1. Go to your Airtable base: `appUYBhhvXCbvE5GN`
2. Create tables with names exactly as specified:
   - `about-us` ✅ (already exists)
   - `promotion`
   - `banner` (or use `home_banner`)
   - `home_gallery` (or include in `home` table)
   - `services`
   - `gallery`

### Step 2: Add Fields

For each table, add fields as specified in the tables above.

**Important:**

- Field names must match exactly (case-sensitive)
- Use correct field types (Attachment, Single Line Text, etc.)
- For categories, use Single Select with exact values

### Step 3: Update Table Names in Code

Edit `src/services/airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "about-us", // ✅ Already set
  promotion: "promotion", // Update if different
  home_banner: "banner", // Update if different
  gallery: "gallery", // Update if different
  services: "services", // Update if different
} as const;
```

### Step 4: Test Data Fetching

1. Add sample records to each table
2. Run `npm run dev`
3. Check browser console for errors
4. Verify data appears on pages

---

## 📊 Data Flow

```
Airtable Base (appUYBhhvXCbvE5GN)
    ↓
Tables (about-us, promotion, services, gallery, banner)
    ↓
Airtable.js API (with API key from .env)
    ↓
useAirtable Hook
    ↓
React Components
    ↓
UI Display
```

---

## 🐛 Troubleshooting

### Data Not Showing

1. **Check table name**: Must match exactly in `AIRTABLE_ENDPOINTS`
2. **Check field names**: Must match exactly (case-sensitive)
3. **Check API key**: Verify in `.env` file
4. **Check permissions**: API key must have access to base
5. **Check browser console**: Look for error messages

### Wrong Data Structure

1. **Check field types**: Attachment fields must be Attachment type
2. **Check category values**: Must match exactly (case-insensitive for code, but exact in Airtable)
3. **Check data format**: Numbers should be numbers, not strings

### Images Not Loading

1. **Check attachment URLs**: Airtable URLs expire after some time
2. **Check image format**: Use valid image formats (JPG, PNG, SVG, WebP)
3. **Check CORS**: Airtable.js handles this automatically

---

## 💡 Best Practices

1. **Use consistent naming**: Keep field names consistent across tables
2. **Use Single Select for categories**: Easier to filter and maintain
3. **Add order fields**: Use number fields for custom ordering
4. **Test with sample data**: Add 2-3 records per table for testing
5. **Document custom fields**: If you add fields, update this document

---

## 📝 Migration Notes

### From Old API Structure

Old API returned:

```json
{
  "promotion": {...},
  "home_gallery": [...],
  "banner": [...]
}
```

New Airtable structure:

- Each data type in separate table
- Or use linked records if keeping single `home` table

### Field Name Mapping

| Old API Field | Airtable Field        | Notes                         |
| ------------- | --------------------- | ----------------------------- |
| `id`          | `id`                  | Auto-generated by Airtable    |
| `price`       | `price` or `cost`     | Both supported                |
| `url`         | `url` (in Attachment) | Extract from attachment array |
| `category`    | `category`            | Must match exact values       |

---

## 🚀 Quick Start Checklist

- [ ] Create all tables in Airtable
- [ ] Add all required fields
- [ ] Set up Single Select options for categories
- [ ] Add sample data (2-3 records per table)
- [ ] Update `AIRTABLE_ENDPOINTS` in `airtable.service.ts`
- [ ] Test each page:
  - [ ] Home page loads banner and gallery
  - [ ] Services page shows services by category
  - [ ] Gallery page filters work
  - [ ] About Us page displays cards
  - [ ] Header shows promotion banner (if active)
- [ ] Verify images load correctly
- [ ] Test responsive design on mobile

---

## 📚 Related Documentation

- [AIRTABLE_INTEGRATION.md](./AIRTABLE_INTEGRATION.md) - Setup guide
- [AIRTABLE_SCHEMA.md](./AIRTABLE_SCHEMA.md) - Detailed schema for About Us
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - Migration overview
