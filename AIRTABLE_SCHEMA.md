# Airtable Schema Guide

This document describes the data structure for each Airtable table used in the project.

## 📋 About Us Table (`about-us`)

### Current Structure

The About Us component uses **4 fields** to create beautiful, informative cards:

| Field Name        | Type             | Required    | Description                        | Example                                                               |
| ----------------- | ---------------- | ----------- | ---------------------------------- | --------------------------------------------------------------------- |
| `description`     | Long Text        | ✅ Yes      | Main content text                  | "Our team of experienced technicians is devoted to delivering the..." |
| `icon`            | Attachment       | ⚠️ Optional | Icon/illustration image (SVG/PNG)  | Upload a 150x150 icon                                                 |
| `logo`            | Attachment       | ⚠️ Optional | Logo/text overlay image (SVG/PNG)  | Upload "OUR" / "WE" logo text                                         |
| `backgroundColor` | Single Line Text | ⚠️ Optional | Custom background color (hex/rgba) | `#ffeed6cc`, `#f3f9ffcc`, `rgba(255,238,214,0.8)`                     |

### Visual Design

The component automatically applies:

- ✅ **Custom backgrounds** (use `backgroundColor` field) or fallback to gradients
- ✅ **Icon in white box** (left side, with shadow)
- ✅ **Logo text watermark** (large, semi-transparent background)
- ✅ **Hover effects** (shadow, lift, and icon scale)
- ✅ **Responsive layout** (stacked on mobile → horizontal on desktop)

**Background Color Options:**

- Set custom color in Airtable using `backgroundColor` field (e.g., `#ffeed6cc`, `rgba(255,238,214,0.8)`)
- If not set, component uses fallback gradients: Amber/Orange, Blue/Cyan, Purple/Pink

### Example Records

#### Record 1 (with icon, logo, and custom background)

```json
{
  "description": "Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available.",
  "icon": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-1.svg",
      "filename": "icon-about-us-1.svg",
      "type": "image/svg+xml"
    }
  ],
  "logo": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-our-yellow.svg",
      "filename": "icon-about-us-our-yellow.svg",
      "type": "image/svg+xml"
    }
  ],
  "backgroundColor": "#ffeed6cc"
}
```

#### Record 2 (with icon, logo, and custom background)

```json
{
  "description": "Our highly skilled technicians have undergone advanced training and consistently stay up to date with the latest trends and techniques in nail care. Whether you are seeking a simple, classic manicure or an intricate nail design, our technicians will skillfully try to bring your vision to life.",
  "icon": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-2.svg",
      "filename": "icon-about-us-2.svg",
      "type": "image/svg+xml"
    }
  ],
  "logo": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-our-blue.svg",
      "filename": "icon-about-us-our-blue.svg",
      "type": "image/svg+xml"
    }
  ],
  "backgroundColor": "#f3f9ffcc"
}
```

#### Record 3 (with icon, logo, and custom background)

```json
{
  "description": "We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident.",
  "icon": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-3.svg",
      "filename": "icon-about-us-3.svg",
      "type": "image/svg+xml"
    }
  ],
  "logo": [
    {
      "url": "https://v5.airtableusercontent.com/.../icon-about-us-we.svg",
      "filename": "icon-about-us-we.svg",
      "type": "image/svg+xml"
    }
  ],
  "backgroundColor": "#f7f7f7"
}
```

## 🎨 Styling Options

### Background Colors

You can customize each card's background in two ways:

**Option 1: Custom Color from Airtable** (Recommended)

- Set the `backgroundColor` field with any CSS color value
- Examples: `#ffeed6cc`, `#f3f9ffcc`, `rgba(255,238,214,0.8)`
- Supports hex, rgba, named colors

**Option 2: Fallback Gradients** (Auto-applied if `backgroundColor` is empty)

1. **Amber/Orange** (`from-amber-50 to-orange-50`) - Warm and inviting
2. **Blue/Cyan** (`from-blue-50 to-cyan-50`) - Cool and professional
3. **Purple/Pink** (`from-purple-50 to-pink-50`) - Elegant and luxurious

### Additional Styling

Each card also gets:

- **Icon box**: White rounded square with shadow, contains uploaded icon
- **Logo watermark**: Large semi-transparent logo text behind description
- **Decorative elements**: Subtle circular shapes in corners
- **Hover effects**: Card lifts up, shadow increases, icon scales up
- **Responsive layout**: Vertical on mobile, horizontal on desktop

## 🚀 Quick Start

To add/edit content:

1. **Go to Airtable**: https://airtable.com/appj9Es9rfmtwnDZn
2. **Open the `about-us` table**
3. **Edit or add records**:
   - **Description** (required): Write your text content
   - **Icon** (optional): Upload a small icon/illustration (150x150px recommended, SVG or PNG)
   - **Logo** (optional): Upload logo text image ("OUR", "WE", etc., SVG or PNG)
   - **backgroundColor** (optional): Set custom background color (e.g., `#ffeed6cc`, `rgba(255,238,214,0.8)`)
4. **Save** - Changes appear immediately on your website

**Pro Tips:**

- Use SVG files for best quality at any size
- Keep icons simple and recognizable
- Logo should be text-only for watermark effect
- Use semi-transparent colors with alpha channel for subtle backgrounds (e.g., `#ffeed6cc`)
- If no backgroundColor is set, component uses beautiful fallback gradients!

## 📊 Data Flow

```
Airtable Table
     ↓
{
  "records": [
    {
      "id": "recXXXX",
      "fields": {
        "description": "Our team of...",
        "icon": [{ "url": "https://..." }],
        "logo": [{ "url": "https://..." }],
        "backgroundColor": "#ffeed6cc"
      }
    }
  ]
}
     ↓
Component extracts data and applies styling
     ↓
Beautiful cards with:
- Icon in white box (left)
- Logo watermark (background)
- Description (foreground)
- Custom background color (or fallback gradient)
- Hover effects
```

## ✅ Testing

After updating your Airtable:

1. Save changes in Airtable
2. Refresh your website: http://localhost:5175/about-us
3. You should see the updated content styled automatically!

## 🎯 Best Practices

### Writing Great Descriptions

- **Length**: 2-4 sentences work best
- **Tone**: Professional yet warm
- **Focus**: Highlight your unique value
- **Grammar**: Proofread carefully

### Good Example

```
"Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available."
```

### Avoid

```
"We are the best!" // Too short, not descriptive
"Our team has been... [500 words]" // Too long
```

### Icon Guidelines

- **Format**: SVG preferred (scales perfectly), PNG also works
- **Size**: 150x150px to 200x200px recommended
- **Style**: Simple, recognizable, professional
- **Color**: Any color (will display on white background)
- **Examples**:
  - ✅ Team icon (people silhouettes)
  - ✅ Award badge
  - ✅ Salon/shop icon
  - ❌ Complex photographs
  - ❌ Text-heavy designs

### Logo Guidelines

- **Format**: SVG preferred for crisp text
- **Content**: Large text only ("OUR", "WE", "BEST", etc.)
- **Size**: Wide format (300x100px recommended)
- **Style**: Bold, simple letterforms
- **Purpose**: Background watermark effect
- **Examples**:
  - ✅ "OUR" in large letters
  - ✅ "WE" in bold
  - ✅ Single word, clear typography
  - ❌ Full sentences
  - ❌ Complex logos with multiple elements

### Background Color Guidelines

- **Format**: CSS color values (hex, rgba, hsl, named colors)
- **Recommended**: Use alpha channel for subtle, semi-transparent backgrounds
- **Examples**:
  - ✅ `#ffeed6cc` - Hex with alpha (peach with transparency)
  - ✅ `#f3f9ffcc` - Hex with alpha (light blue with transparency)
  - ✅ `rgba(255,238,214,0.8)` - RGBA format
  - ✅ `#f7f7f7` - Solid light gray
  - ✅ `hsl(30, 100%, 95%)` - HSL format
  - ⚠️ Avoid very dark colors (text readability)
  - ⚠️ Avoid pure white (lacks visual interest)
- **Pro Tip**: Add `cc` or `dd` at the end of hex colors for 80-85% opacity
- **Testing**: Check text contrast and readability on your chosen color

## 🔄 Adding More Cards

Want to showcase more aspects of your business?

1. Simply add more records in Airtable
2. Each new record becomes a new card
3. Colors cycle automatically (card 4 = amber, card 5 = blue, etc.)

## 📚 Future Tables

When adding other sections (Services, Gallery, etc.), you can follow the same simple pattern or add more fields as needed. Each component can be customized based on requirements.

### Example: Services Table (Future)

```
Fields:
- name (Single line text) - Service name
- description (Long text) - Service description
- price (Number) - Service price
- duration (Single line text) - Service duration
```

## 💡 Why This Simple Approach?

- ✅ **Easy to manage** - Just text, no configuration
- ✅ **Consistent design** - Automatic styling
- ✅ **Fast updates** - Change content without touching code
- ✅ **Scalable** - Add unlimited cards
- ✅ **Mobile-friendly** - Responsive by default

## 🐛 Troubleshooting

### Content Not Showing

1. Check Airtable table name is exactly: `about-us`
2. Verify at least one record has `description` field filled
3. Check browser console for errors
4. Refresh the page

### Icon/Logo Not Displaying

1. **Check upload**: Verify file uploaded successfully in Airtable
2. **Check URL**: Look at network tab to see if image loaded
3. **File format**: Ensure it's SVG, PNG, JPG, or WebP
4. **Airtable permissions**: Check API token has access to attachments
5. **Fallback**: Component will hide broken images gracefully

**Common Issues:**

```
❌ Icon/logo field is empty → Image won't show (that's OK, it's optional)
❌ URL expired → Re-upload the image to get fresh URL
❌ File too large → Keep under 5MB
✅ SVG not rendering → Check if SVG is valid XML
```

### Styling Looks Different

The component uses Tailwind CSS classes:

- Make sure Tailwind is properly configured
- Check `tailwind.config.js` has custom colors defined
- Verify build process completed successfully
- Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

## 📖 Learn More

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Project README](./README.md)
- [Airtable Integration Guide](./AIRTABLE_INTEGRATION.md)
