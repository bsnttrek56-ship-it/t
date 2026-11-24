TRIPY STAY — COMPLETE WEBSITE PROJECT

FILES
- index.html: website structure and page content
- css/style.css: complete navy and gold design
- js/script.js: booking logic, availability check, price calculation and reception dashboard
- assets/tripy-mark.svg: Tripy Stay project mark / favicon

RUN IN VISUAL STUDIO CODE
1. Download and extract TripyStay-Complete-Website.zip.
2. Open Visual Studio Code.
3. Choose File > Open Folder, then select TripyStay_Complete.
4. Open index.html.
5. Recommended: install the Live Server extension (Ritwick Dey).
6. Right-click index.html and choose "Open with Live Server".
7. The site opens in your browser. Save edits with Ctrl+S.

TEST
1. Click Book Your Stay.
2. Enter sample guest details and dates.
3. Select a room and optional services.
4. Confirm Reservation to receive a Booking ID and room number.
5. Open Reception in the top navigation to see the saved booking.
6. Try another booking on overlapping dates to test room availability.

PUBLISH WITH GITHUB PAGES
1. Sign in at https://github.com.
2. Click + > New repository.
3. Name it tripy-stay and choose Public, then Create repository.
4. In the new repository choose Add file > Upload files.
5. Upload the CONTENTS of this folder (index.html, css, js, assets, README.txt).
   IMPORTANT: index.html must be in the repository root, not nested in another folder.
6. Click Commit changes.
7. Open Settings > Pages.
8. Under Build and deployment choose Deploy from a branch.
9. Select branch main and folder /(root), then Save.
10. Wait a minute or two. GitHub will show a URL similar to:
    https://YOUR-USERNAME.github.io/tripy-stay/
11. Replace YOUR-USERNAME with your GitHub username and share that URL with your instructor.

DATABASE NOTE
This is a front-end demonstration. Bookings are saved in localStorage in the current browser only.
It is NOT connected to SQL Server and bookings are not shared across devices.
Prices and room numbers are demo values. For a real multi-user system, connect this site to a backend/API and the Tripy Stay SQL database. Be clear about this in your presentation.
