# TODO: Enhance MCN Museum App

## 1. Add More Artworks (Oeuvres)
- [x] Add 10+ new oeuvres to lib/data.ts with diverse types, images, descriptions
- [x] Associate oeuvres with existing expositions
- [x] Add audio/video URLs where appropriate
- [x] Ensure unique QR codes for each oeuvre
- [x] Use real image URLs for oeuvres (partial - updated some)

## 2. Complete Functionalities
- [x] Verify all API endpoints work (oeuvres, expositions, evenements, billets)
- [x] Ensure all pages load correctly
- [x] Test navigation between expositions and oeuvres
- [x] Fix any missing images or broken links
- [x] Fixed API params issue for expositions/[id]

## 3. QR Codes for Expositions
- [x] Add qrCode field to Exposition type in lib/types.ts
- [x] Update expositions data with QR codes
- [x] Modify app/expositions/[id]/page.tsx to display QR code
- [x] QR code should link to the first oeuvre in the exposition (/oeuvres/{id})
- [x] Make QR codes visible using QR server API

## 4. Frontend Redesign
- [x] Improve hero sections with better gradients and animations
- [x] Enhance card designs with hover effects
- [x] Add loading states and transitions
- [x] Improve color scheme and typography
- [x] Make mobile responsive better
- [x] Redesign billetterie page with animations and background

## 5. Statistics Display
- [x] Create app/stats/page.tsx
- [x] Display counts: total oeuvres, expositions, evenements, billets
- [x] Add charts or visual representations
- [x] Make stats accessible from header or admin page

## 6. Testing and Validation
- [ ] Test all new oeuvres pages
- [ ] Verify QR code links work
- [ ] Check stats accuracy
- [ ] Ensure no console errors
- [ ] Test on different screen sizes
- [ ] Final validation before delivery
