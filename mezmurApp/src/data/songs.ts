/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Song } from "../types";

export const SONGS_DATA: Song[] = [
  {
    id: "mezmur-1",
    number: 1,
    title: {
      am: "እግዚአብሔር ብርሃኔና መድኃኒቴ ነው",
      en: "The Lord is My Light and Salvation",
    },
    category: {
      am: "የምስጋና መዝሙር",
      en: "Praise & Thanksgiving",
    },
    author: {
      am: "ቅዱስ ዳዊት (መዝሙር ፳፯)",
      en: "King David (Psalm 27)",
    },
    album: {
      am: "የሕይወት ቃል",
      en: "Word of Life",
    },
    lyrics: {
      am: `እግዚአብሔር ብርሃኔና መድኃኒቴ ነው የሚያስፈራኝ ማን ነው?
እግዚአብሔር የሕይወቴ መሸሸጊያዋ ነው የሚያስደነግጠኝ ማን ነው?

ክፉዎች ሥጋዬን ይበሉ ዘንድ ወደ እኔ በቀረቡ ጊዜ፥
አስጨናቂዎቼና ጠላቶቼ እነርሱ ተሰናከሉና ወደቁ።

ሠራዊትም ቢሰፍርብኝ ልቤ አይፈራም፤
ሰልፍም ቢነሣብኝ በዚህ እታመናለሁ።

አንዲትን ነገር እግዚአብሔርን ለመንሁት እሷንም እሻለሁ፤
በሕይወቴ ዘመን ሁሉ በእግዚአብሔር ቤት እኖር ዘንድ፥
የእግዚአብሔርን ደስታ አይ ዘንድ መቅደሱንም እሳለም ዘንድ።`,
      en: `The Lord is my light and my salvation; whom shall I fear?
The Lord is the strength of my life; of whom shall I be afraid?

When the wicked came against me to eat up my flesh,
My enemies and foes, they stumbled and fell.

Though an army may encamp against me, my heart shall not fear;
Though war should rise against me, in this I will be confident.

One thing I have desired of the Lord, that will I seek:
That I may dwell in the house of the Lord all the days of my life,
To behold the beauty of the Lord, and to inquire in His temple.`,
    },
    melodyIndex: 0,
    audioUrl: "/assets/audio/lord_is_my_light.mp3",
  },
  {
    id: "mezmur-2",
    number: 2,
    title: {
      am: "የማንቂያ ደወል",
      en: "The Awakening Bell",
    },
    category: {
      am: "የንስሐ መዝሙር",
      en: "Repentance & Vigil",
    },
    author: {
      am: "የቅዱስ ያሬድ ዜማ",
      en: "St. Yared",
    },
    album: {
      am: "የማለዳ ምስጋና",
      en: "Morning Hymns",
    },
    lyrics: {
      am: `የማንቂያው ደወል ሲሰማ በጧት፥
ልባችን ይነሳ ለምስጋና ጸሎት።
ክፉውን ትተን መልካሙን እንድንሠራ፥
ይረባናልና እግዚአብሔርን መፍራት።

አምላካችን ሆይ ማረን ይቅር በለን፥
የሠራነውን ኃጢአት ሁሉ ደምስስልን።
በቤተ መቅደስህ እንድንቆም በሰላም፥
ጸጋህን አብዛልን ለዘለዓለም።

የሰማዩ ንጉሥ የፍቅር አባት ሆይ፥
ልመናችንን ስማ በምሕረትህ እይ።
ምድርና ሰማይ በስምህ ይከብራሉ፥
ፍጥረታት ሁሉ ምስጋና ያቀርባሉ።`,
      en: `When the awakening bell rings in the morning,
Let our hearts rise for prayer and thanksgiving.
Leaving behind the evil, let us do good,
For the fear of the Lord is our salvation.

O Lord our God, have mercy and forgive us,
Blot out all the transgressions we committed.
To stand in Your holy temple in peace,
Multiply Your grace upon us forever.

O King of Heaven, Father of divine love,
Hear our prayers and look upon us with mercy.
Heaven and Earth are glorified by Your Name,
And all creations offer praise unto You.`,
    },
    melodyIndex: 1,
    audioUrl: "/assets/audio/awakening_bell.mp3",
  },
  {
    id: "mezmur-3",
    number: 3,
    title: {
      am: "ስብሐት ለአምላክ",
      en: "Glory to God",
    },
    category: {
      am: "የምስጋና መዝሙር",
      en: "Praise & Thanksgiving",
    },
    author: {
      am: "ሊቀ መዘምራን",
      en: "Choir Director",
    },
    album: {
      am: "የቅዱሳን ምስጋና",
      en: "Praise of Saints",
    },
    lyrics: {
      am: `ስብሐት ለአምላክ በሰማያት ይሁን፥
ሰላምም በምድር ለሰው ልጅ በሙሉ፤
ስሙን እናመስግን በደስታ እንዘምር፥
እርሱ አድኖናልና ከሞት ከጨለማ።

ቅዱስ ቅዱስ ቅዱስ አምላከ ቅዱሳን፥
ሰማይና ምድር በክብርህ ሞልተዋል፤
የሰራዊት ጌታ የኃያላን ኃያል፥
ክብርና ምስጋና ላንተ ይገባል።

ዘምሩ ለአምላክ ዘምሩ በደስታ፥
ስሙን ከፍ አድርጉት እልል በሉለት፤
ለዘለዓለም ነውና የእርሱ ቸርነት፥
ምሕረቱ አያልቅም ለልጅ ልጅ እውነት።`,
      en: `Glory be to God in the highest heavens,
And peace on earth to all of mankind;
Let us praise His name and sing with joy,
For He has saved us from death and darkness.

Holy, Holy, Holy, Lord God of Hosts,
Heaven and earth are full of Your glory;
Lord of Armies, Mightiest of the mighty,
Honor and praise are due unto You.

Sing unto God, sing with great joy,
Exalt His holy name, shout with triumph;
For His goodness endures forever,
And His mercy is true from age to age.`,
    },
    melodyIndex: 2,
    audioUrl: "/assets/audio/glory_to_god.mp3",
  },
  {
    id: "mezmur-4",
    number: 4,
    title: {
      am: "እመቤቴ ማርያም",
      en: "St. Mary My Lady",
    },
    category: {
      am: "የድንግል ማርያም መዝሙር",
      en: "Hymn to St. Mary",
    },
    author: {
      am: "የጥንት አባቶች",
      en: "Ancient Fathers",
    },
    album: {
      am: "እማሆይ",
      en: "Mother of Light",
    },
    lyrics: {
      am: `እመቤቴ ማርያም የልቤ መከታ፥
ላንቺ ይገባሻል ሰላምታና ክብር፤
በጭንቄ ቀን ሁሉ ረዳቴ የሆንሽኝ፥
የአምላኬ እናት ሆይ በፍቅርሽ ልዘምር።

ከቅዱሳን ሁሉ በላይ የከበርሽ፥
የሰላም መገኛ የንጽሕና ደጅ፤
በጸሎትሽ ሁልጊዜ አስቢን እመቤቴ፥
ልጅሽ እንዲምረን ለዓለም ሁሉ ፈጅ።

ስምሽን ስጠራ ልቤ ይደሰታል፥
ፍቅርሽ በውስጤ ሞልቶ ይፈሳል፤
ድንግል ማርያም ሆይ የአምላክ ማደሪያ፥
የሰው ልጅ በሙሉ ባንቺ ይመካል።`,
      en: `O Mary, my Lady, the shield of my heart,
To you belongs all greetings and honor;
My helper in all the days of my distress,
O Mother of my God, I sing of your love.

Glorified and honored above all the saints,
The source of our peace, the gate of purity;
Remember us always in your prayers, my Lady,
That your Son may have mercy on the whole world.

When I call your name, my heart rejoices,
Your love overflows deep within my soul;
O Virgin Mary, the dwelling of God,
All of humanity takes comfort in you.`,
    },
    melodyIndex: 3,
    audioUrl: "/assets/audio/mary_my_lady.mp3",
  },
];
