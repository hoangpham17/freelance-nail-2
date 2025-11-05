# Airtable Schema Guide

This document describes the data structure for each Airtable table used in the project.

## 📋 About Us Table (`about-us`)

### Current Structure

The About Us component uses a **simple structure** with only one required field:

| Field Name    | Type      | Required | Description       | Example                                                               |
| ------------- | --------- | -------- | ----------------- | --------------------------------------------------------------------- |
| `description` | Long Text | ✅ Yes   | Main content text | "Our team of experienced technicians is devoted to delivering the..." |

### Visual Design

The component automatically applies:

- ✅ **Gradient backgrounds** (3 colors rotate automatically)
- ✅ **Card numbers** (1, 2, 3...)
- ✅ **Hover effects** (shadow and lift)
- ✅ **Responsive layout** (1 column mobile → 3 columns desktop)

### Example Records

#### Record 1

```
description: "Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available."
```

#### Record 2

```
description: "Our highly skilled technicians have undergone advanced training and consistently stay up to date with the latest trends and techniques in nail care. Whether you are seeking a simple, classic manicure or an intricate nail design, our technicians will skillfully try to bring your vision to life."
```

#### Record 3

```
description: "We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident."
```

## 🎨 Automatic Styling

The component cycles through these gradient backgrounds:

1. **Amber/Orange** - Warm and inviting
2. **Blue/Cyan** - Cool and professional
3. **Purple/Pink** - Elegant and luxurious

Each card also gets:

- Numbered badge (1, 2, 3...)
- Decorative circle element
- Hover animation
- Shadow effects

## 🚀 Quick Start

To add/edit content:

1. **Go to Airtable**: https://airtable.com/appj9Es9rfmtwnDZn
2. **Open the `about-us` table**
3. **Edit or add records** - Just fill in the `description` field!
4. **Save** - Changes appear immediately on your website

That's it! No need to configure colors, images, or any styling.

## 📊 Data Flow

```
Airtable Table
     ↓
{
  "records": [
    {
      "id": "recXXXX",
      "fields": {
        "description": "Our team of..."
      }
    }
  ]
}
     ↓
Component applies automatic styling
     ↓
Beautiful gradient cards with numbers
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

### Styling Looks Different

The component uses Tailwind CSS classes:

- Make sure Tailwind is properly configured
- Check `tailwind.config.js` has custom colors defined
- Verify build process completed successfully

## 📖 Learn More

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Project README](./README.md)
- [Airtable Integration Guide](./AIRTABLE_INTEGRATION.md)
