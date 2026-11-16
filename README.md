# PickD test app for iPhone

PickD as a real iPhone app, built on GitHub's Macs and installed from Windows with a free Apple ID. No Mac and no paid Apple account needed.

What's inside:

- `www/` is the app itself, with the test photos, videos and posts.
- `ios/` is the Xcode project that wraps it (Capacitor 8.6.0).
- `.github/workflows/build-ios.yml` is the file that tells GitHub how to build `PickD.ipa`.

Everything you post stays on your iPhone.

## 1. Put the project on GitHub

1. Sign up at github.com (free) and click **New repository**. Name it `pickd`.
   Make it **Public**: public repositories build for free with no monthly limit. Private ones get a smaller free allowance of Mac build time.
2. On the new repository's page, click **uploading an existing file**.
3. Drag in everything from this folder except `node_modules` (if you have it). That means `www`, `ios`, `resources`, `package.json`, `package-lock.json`, `capacitor.config.json`, `README.md` and `.gitignore`. Click **Commit changes**.
4. Browsers often skip folders whose names start with a dot, so add the build file by hand:
   **Add file → Create new file**, name it `.github/workflows/build-ios.yml`,
   paste in the contents of that file from this folder, and click **Commit changes**.

## 2. Build the app

1. Open the **Actions** tab. A run called **Build iPhone app** starts on its own after each commit. To start one yourself, choose **Build iPhone app → Run workflow**.
2. Wait about 10 minutes for the green tick.
3. Open the run and, under **Artifacts**, download **PickD-ipa**. Unzip it to get `PickD.ipa`.

## 3. Install it on your iPhone (Windows)

1. Install **Sideloadly** from sideloadly.io and follow its setup notes. It may ask for iTunes and iCloud from Apple's website.
2. Plug your iPhone into the PC with a cable, unlock it and tap **Trust**.
3. Open Sideloadly, drag in `PickD.ipa`, type your Apple ID and click **Start**.
4. On the iPhone, trust the app: **Settings → General → VPN & Device Management**, tap your Apple ID, then **Trust**.
5. On iOS 16 or later, turn on **Settings → Privacy & Security → Developer Mode** and restart when asked.
6. Open PickD from your Home Screen.

## Things to know

- With a free Apple ID the app works for **7 days**. Re-install it from Sideloadly with the same `PickD.ipa` and Apple ID before then.
- A free Apple ID can have **3** sideloaded apps at a time, on your own devices only.
- **To change the app**, edit `www/index.html` on GitHub. That starts a new build, and you install the new `PickD.ipa` the same way.
- Test posts are marked "Test post". Hide them in **Profile → Interests → Show test posts**.

## Credits

Test photos are from Wikimedia Commons. Each post shows its photographer and licence. The test videos are slow-zoom clips made from those photos.
