# Al-Israa Creativity Co. Website
## شركة ابداع الاسراء لانتاج جبس الذره و البطاطا

A modern, bilingual (Arabic-English) animated business website for Al-Israa Creativity Co., specializing in corn and potato snacks production.

## Features

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) support with smooth language switching
- **Modern Design**: Clean, professional design with gradient backgrounds and modern typography
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Animated Elements**: 
  - Hero slider with auto-play and manual navigation
  - Product showcase slider
  - Scroll-triggered animations using AOS library
  - Smooth transitions and hover effects
- **Interactive Components**:
  - Touch/swipe support for mobile
  - Keyboard navigation
  - Smooth scrolling navigation
  - Dynamic navbar with scroll effects
- **SEO Optimized**: Meta tags, semantic HTML, and proper structure
- **Performance Optimized**: Lazy loading, image optimization, and efficient code
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## Files Structure

```
/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md          # This documentation
├── robots.txt         # Search engine crawling instructions
└── sitemap.xml        # Site structure for SEO
```

## Installation & Deployment

### Option 1: GoDaddy CPanel Upload
1. **Download/Upload Files**:
   - Download all files (index.html, style.css, script.js)
   - Log into your GoDaddy CPanel
   - Go to File Manager
   - Navigate to public_html folder
   - Upload all files

2. **Set Permissions**:
   - Ensure files have proper permissions (644 for files, 755 for directories)

3. **Test Website**:
   - Visit your domain to test the website
   - Check both Arabic and English versions
   - Test on mobile devices

### Option 2: Local Development
1. **Clone/Download**: Download all files to a local folder
2. **Open in Browser**: Double-click index.html or open in any web browser
3. **Local Server** (recommended): Use a local server like Live Server extension in VS Code

## Usage Instructions

### Language Switching
- Click the language toggle button in the top-right corner
- Supports Arabic (RTL) and English (LTR)
- Language preference is saved in browser storage

### Navigation
- **Hero Slider**: 
  - Auto-advances every 5 seconds
  - Use arrow buttons or keyboard arrows to navigate
  - Swipe on mobile devices
  - Click indicators at the bottom

- **Product Slider**:
  - Use navigation buttons to browse products
  - Displays products in organized categories

- **Smooth Scrolling**: Click navigation links for smooth scrolling to sections

### Customization

#### Update Company Information
Edit the following sections in `index.html`:

1. **Company Name**: Update both Arabic and English versions
2. **Contact Information**: 
   - Phone numbers: Lines 390-391
   - Address: Line 396
   - Google Maps: Replace iframe src with your location

3. **Products**: Replace placeholder images with actual product images
4. **Social Media**: Update social media links (currently set to #)

#### Update Images
Replace placeholder images with actual product images:
- Hero section images
- Product showcase images
- Ensure images are optimized for web (compressed, appropriate size)

#### Color Scheme
Modify CSS variables in `style.css`:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    /* ... other colors ... */
}
```

#### Fonts
Current Arabic fonts used:
- Cairo
- Tajawal

To change fonts, update Google Fonts link in HTML head and CSS font-family declarations.

## Technical Details

### Dependencies
- **Bootstrap 5.3.0**: For responsive layout and components
- **Font Awesome 6.4.0**: For icons
- **AOS (Animate On Scroll)**: For scroll animations
- **Google Fonts**: For Arabic typography

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Lazy loading for images
- Optimized animations
- Efficient CSS and JavaScript
- Compressed resources
- Service worker ready (PWA support)

## Customization Guide

### Adding New Products
1. **HTML**: Add new product cards in the product slider section
2. **Images**: Add product images to your hosting
3. **Animation**: Products will automatically animate when slider changes

### Modifying Animations
- **AOS Settings**: Modify AOS initialization in `script.js`
- **CSS Animations**: Custom animations are defined in `style.css`
- **Timing**: Adjust animation durations in CSS variables

### SEO Optimization
1. **Meta Tags**: Update meta descriptions and keywords
2. **Structured Data**: Add JSON-LD structured data for business
3. **Sitemap**: Update sitemap.xml with your actual pages
4. **Robots.txt**: Configure crawling permissions

## Troubleshooting

### Common Issues

1. **Images Not Loading**:
   - Check file paths
   - Ensure images are uploaded to correct directory
   - Verify image formats (JPG, PNG, WebP)

2. **Language Not Switching**:
   - Check JavaScript console for errors
   - Ensure script.js is properly linked
   - Clear browser cache

3. **Animations Not Working**:
   - Verify AOS library is loaded
   - Check for JavaScript errors
   - Ensure proper CSS classes are applied

4. **Mobile Issues**:
   - Test viewport meta tag
   - Check responsive CSS rules
   - Verify touch events are working

### Performance Optimization
- Optimize images (use WebP format when possible)
- Minimize CSS and JavaScript for production
- Enable GZIP compression on server
- Use CDN for external resources

## Support & Maintenance

### Regular Updates
- Keep external libraries updated
- Monitor for security vulnerabilities
- Update content and images regularly
- Test on new browser versions

### Backup
- Regularly backup website files
- Keep local copies of all assets
- Document any customizations made

## Contact Information

For technical support or customization requests:
- **Factory Location**: جميلة الصناعية - شارع حسينية الأنصار
- **Phone**: 07731210823, 07726102560
- **Products**: Corn and potato snacks production

## License

This website template is created for Al-Israa Creativity Co. All rights reserved.

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Compatible with**: Modern web browsers, mobile devices
**Framework**: Bootstrap 5, Pure CSS/JS