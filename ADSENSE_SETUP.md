# Google AdSense Setup Guide

## ✅ What's Been Done

1. **AdSense Script Added**: The Google AdSense script has been added to `client/index.html`
2. **Ad Components Created**:
   - `AdBanner.jsx` - For horizontal/responsive banner ads
   - `InFeedAd.jsx` - For in-feed ads between content
3. **Ads Placed On**:
   - Home page (bottom banner)
   - Dashboard (in-feed ad between stats sections)
   - Leaderboard (bottom banner)

## 🔧 Next Steps to Complete Setup

### 1. Get Your Ad Unit IDs from Google AdSense

After your site is approved by Google AdSense:

1. Go to [Google AdSense Dashboard](https://www.google.com/adsense/)
2. Navigate to **Ads** → **By ad unit**
3. Create new ad units for each placement:
   - **Display Ad** (for banners on Home & Leaderboard)
   - **In-feed Ad** (for Dashboard)
4. Copy the **Ad Slot ID** for each unit (looks like: `1234567890`)

### 2. Update Ad Slot IDs in Your Code

Replace `"YOUR_AD_SLOT_ID"` with actual slot IDs:

**Home.jsx** (line ~110):
```jsx
<AdBanner slot="1234567890" format="horizontal" />
```

**Dashboard.jsx** (line ~95):
```jsx
<InFeedAd slot="9876543210" />
```

**Leaderboard.jsx** (line ~150):
```jsx
<AdBanner slot="5555555555" format="horizontal" />
```

### 3. Customize Ad Placements (Optional)

You can add more ads to other pages following the same pattern:

```jsx
// Import the component
import AdBanner from '../components/AdBanner'
// or
import InFeedAd from '../components/InFeedAd'

// Add the ad where you want it
<AdBanner slot="YOUR_SLOT_ID" format="auto" />
```

**Good places to add more ads:**
- Game page (after game results)
- Multiplayer rooms list
- Profile page
- Between game history items

### 4. Test Your Ads

⚠️ **Important**: Ads will only load in production, not in development mode.

To test:
1. Deploy your site to Vercel
2. Wait 24-48 hours for Google to approve your site
3. Visit your live site to see ads

### 5. AdSense Approval Tips

- **Content**: Ensure you have sufficient content on your site
- **Privacy Policy**: Add a privacy policy page (required by AdSense)
- **Navigation**: Make sure all pages are easily accessible
- **Traffic**: Wait until you have some organic traffic before applying

## 📊 Ad Performance Best Practices

1. **Don't overdo it**: Too many ads hurt user experience
2. **Strategic placement**: Place ads where users naturally pause
3. **Mobile-friendly**: All ads are responsive by default
4. **Above the fold**: Consider adding an ad in the navbar area
5. **Between content**: In-feed ads perform better than banner ads

## 🚨 Common Issues

**"Ads not showing"**
- Ads only show in production (`NODE_ENV=production`)
- Wait 24-48 hours after adding the AdSense code
- Check browser console for errors
- Verify your site is approved in AdSense dashboard

**"Ad layout broken"**
- Ensure parent container has proper width
- Check CSS conflicts with `.adsbygoogle` class
- Test on different screen sizes

## 💰 Monetization Tips

1. **Build traffic first**: Focus on getting users before optimizing ads
2. **Monitor performance**: Use AdSense reports to see which placements work best
3. **A/B test**: Try different ad sizes and placements
4. **User experience**: Never sacrifice UX for ad revenue
5. **Optimize load time**: Ads load asynchronously and won't block your content

## 📝 Privacy Policy Requirement

Google AdSense requires a privacy policy. Add this to your site:

Create a new file: `client/src/pages/Privacy.jsx`

Then add it to your routes and footer/navbar.

---

**Your AdSense Publisher ID**: `ca-pub-9394005351573853`

Good luck with monetization! 🚀
