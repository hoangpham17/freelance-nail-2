# SEO Setup Guide

Dự án này đã được setup SEO với React Helmet Async. Bạn không cần chuyển sang Next.js để có SEO tốt.

## ✅ Đã được setup

1. **React Helmet Async** - Quản lý meta tags động
2. **SEO Component** - Component tái sử dụng cho meta tags
3. **Structured Data** - JSON-LD schema cho Local Business
4. **Sitemap.xml** - Sitemap cho search engines
5. **Robots.txt** - Đã được cải thiện

## 📝 Cách sử dụng

### Thêm SEO vào mỗi page:

```tsx
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const YourPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Title"
        description="Page description for SEO"
        keywords="keyword1, keyword2, keyword3"
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
      <StructuredData type="LocalBusiness" />
      {/* Your page content */}
    </>
  );
};
```

### Cập nhật sitemap.xml

Khi deploy, cập nhật `public/sitemap.xml` với domain thực tế:

- Thay `https://yourdomain.com` bằng domain thực tế
- Cập nhật `lastmod` dates

### Cập nhật robots.txt

Cập nhật `public/robots.txt`:

- Thay `https://yourdomain.com` bằng domain thực tế

### Environment Variables

Tạo file `.env`:

```env
VITE_SITE_URL=https://theveiranailspa.com
```

## 🚀 Next Steps (Optional - để SEO tốt hơn)

1. **Pre-rendering**: Có thể dùng `vite-plugin-ssr` hoặc `prerender-spa-plugin` để pre-render static pages
2. **Dynamic Sitemap**: Tạo script để generate sitemap tự động từ routes
3. **Analytics**: Thêm Google Analytics và Google Search Console
4. **Performance**: Optimize images, lazy loading, code splitting

## 📊 SEO Checklist

- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured Data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [ ] Pre-rendering (optional)
- [ ] Analytics setup
- [ ] Google Search Console verification

## 💡 Lưu ý

- React app vẫn có thể SEO tốt với setup này
- Next.js chỉ cần thiết nếu bạn cần SSR/SSG phức tạp
- Với SPA, Google đã có thể crawl JavaScript tốt
- Pre-rendering có thể cải thiện thêm nhưng không bắt buộc
