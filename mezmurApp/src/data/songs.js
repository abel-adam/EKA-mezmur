/**
 * Ethiopian Orthodox Tewahedo Hymns Dataset (የመዝሙራት መረጃ ስብስብ)
 * 
 * Each hymn entry contains metadata including numbers, categorization, lyrics in Amharic,
 * composer details, and audio synthesizer indexing details.
 * 
 * @typedef {Object} Song
 * @property {string} id - Unique identifier (format: mezmur-N).
 * @property {number} number - The canonical hymn index number.
 * @property {string} title - The title of the hymn in Amharic.
 * @property {string} category - The thematic classification (e.g. ንስሐ, ምስጋና, ድንግል ማርያም).
 * @property {string} [author] - The author, saint (e.g. Saint Yared), or composer of the hymn.
 * @property {string} [album] - The spiritual album details where applicable.
 * @property {string} lyrics - Complete verses of the hymn in Amharic.
 * @property {number} melodyIndex - Index corresponding to the pentatonic scale and playback pattern.
 * @property {string} [audioUrl] - Indicator of reference audio track resource.
 */

/** @type {Array<Song>} */
export const SONGS_DATA = [
  {
    id: "mezmur-1",
    number: 1,
    title: "እግዚአብሔር ብርሃኔና መድኃኒቴ ነው",
    category: "የምስጋና መዝሙር",
    author: "ቅዱስ ዳዊት (መዝሙር ፳፯)",
    album: "የሕይወት ቃል",
    lyrics: `እግዚአብሔር ብርሃኔና መድኃኒቴ ነው የሚያስፈራኝ ማን ነው?
እግዚአብሔር የሕይወቴ መሸሸጊያዋ ነው የሚያስደነግጠኝ ማን ነው?

ክፉዎች ሥጋዬን ይበሉ ዘንድ ወደ እኔ በቀረቡ ጊዜ፥
አስጨናቂዎቼና ጠላቶቼ እነርሱ ተሰናከሉና ወደቁ።

ሠራዊትም ቢሰፍርብኝ ልቤ አይፈራም፤
ሰልፍም ቢነሣብኝ በዚህ እታመናለሁ።

አንዲትን ነገር እግዚአብሔርን ለመንሁት እሷንም እሻለሁ፤
በሕይወቴ ዘመን ሁሉ በእግዚአብሔር ቤት እኖር ዘንድ፥
የእግዚአብሔርን ደስታ አይ ዘንድ መቅደሱንም እሳለም ዘንድ።`,
    melodyIndex: 0,
    audioUrl: "/assets/audio/lord_is_my_light.mp3",
  },
  {
    id: "mezmur-2",
    number: 2,
    title: "የማንቂያ ደወል",
    category: "የንስሐ መዝሙር",
    author: "የቅዱስ ያሬድ ዜማ",
    album: "የማለዳ ምስጋና",
    lyrics: `የማንቂያው ደወል ሲሰማ በጧት፥
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
    melodyIndex: 1,
    audioUrl: "/assets/audio/awakening_bell.mp3",
  },
  {
    id: "mezmur-3",
    number: 3,
    title: "ስብሐት ለአምላክ በሰማያት",
    category: "የምስጋና መዝሙር",
    author: "ሊቀ መዘምራን",
    album: "የቅዱሳን ምስጋና",
    lyrics: `ስብሐት ለአምላክ በሰማያት ይሁን፥
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
    melodyIndex: 2,
    audioUrl: "/assets/audio/glory_to_god.mp3",
  },
  {
    id: "mezmur-4",
    number: 4,
    title: "እመቤቴ ማርያም የልቤ መከታ",
    category: "የድንግል ማርያም መዝሙር",
    author: "የጥንት አባቶች",
    album: "እማሆይ",
    lyrics: `እመቤቴ ማርያም የልቤ መከታ፥
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
    melodyIndex: 3,
    audioUrl: "/assets/audio/mary_my_lady.mp3",
  },
  {
    id: "mezmur-5",
    number: 5,
    title: "ኢየሱስ ክርስቶስ የዓለም መድኃኒት",
    category: "የጌታ መዝሙር",
    author: "የቀድሞ መዘምራን",
    album: "የመዳን ቀን",
    lyrics: `ኢየሱስ ክርስቶስ የዓለም መድኃኒት፥
በመስቀል ላይ ውሎ የሰጠን ነፃነት፤
ሞትን ድል አድርጎ በክብር የተነሳ፥
ለዘለዓለም ይኑር የእርሱ ጌትነት።

የፍቅር ምንጭ ነህ የአማኑኤል ጌታ፥
ላንተ ይንበረከክ ፍጥረት ሁሉ ዛሬ፤
ስምህን ስጠራ ይርቃል ፍርሃቴ፥
ደስታን እሞላለሁ በነፍስ በሥጋዬ።

የሕይወታችን ራስ የነፍሳችን እረኛ፥
በጸጋህ ጠብቀን ከክፉው መከራ፤
እስከ መጨረሻው እንድንቆም በእምነት፥
ስምህን እንድንጠራ በቅዱሱ ስፍራ።`,
    melodyIndex: 4,
    audioUrl: "/assets/audio/jesus_savior.mp3",
  },
  {
    id: "mezmur-6",
    number: 6,
    title: "በአንድነት ቆመን አምላክን እናመስግን",
    category: "የምስጋና መዝሙር",
    author: "በአንድነት",
    album: "ሰላመ ክርስቶስ",
    lyrics: `በአንድነት ቆመን አምላክን እናመስግን፥
ስሙ ታላቅ ነውና ክብሩን እንንገረው፤
በቅዱሳን ጉባኤ በታላቁ ማኅበር፥
ምስጋናችንን በፍቅር እናቅርብለት።

ቸርነቱ የበዛልን ምሕረቱ ሰፊ ነው፥
ከጥፋት አድኖን ወደ ብርሃን መራን፤
ላደረገልን ነገር ምን እንከፍለዋለን?
የምስጋናን መሥዋዕት እናቅርብ በዕልልታ።

ሃሌ ሉያ ሃሌ ሉያ ሃሌ ሉያ ለአምላክ፥
አብ ወልድ መንፈስ ቅዱስ ይመስገኑ ዛሬ፤
ለዘለዓለም ዓለም ኃይል ላንተ ይገባል፥
ቅዱሳን መላእክት ያወድሱሃል።`,
    melodyIndex: 5,
    audioUrl: "/assets/audio/congregation_praise.mp3",
  },
  {
    id: "mezmur-7",
    number: 7,
    title: "የመስቀሉ ስምረት",
    category: "የጌታ መዝሙር",
    author: "ቅዱስ ያሬድ",
    album: "የትንሣኤ መዝሙራት",
    lyrics: `በመስቀሉ ብርሃን ጨለማው ተገፈፈ፥
የሞት ጥላ አልፎ ሕይወት ተተካ።
የአምላካችን ፍቅር ለዓለም በራ፥
እኛንም አዳነን ከኃጢአት መከራ።

መስቀል ኃይላችን ነው መስቀል ጽንዓታችን፥
መስቀል ቤዛችን ነው የነፍስ መድኃኒታችን።
በመስቀሉ ዛሬ ሰላምን አገኘን፥
በደስታ ዘምረን ስሙን አከበርን።`,
    melodyIndex: 0,
    audioUrl: "/assets/audio/cross_glory.mp3",
  },
  {
    id: "mezmur-8",
    number: 8,
    title: "ቅዱስ ሚካኤል የሰማይ መልአክ",
    category: "የመላእክት መዝሙር",
    author: "የቤተክርስቲያን መዘምራን",
    album: "የመላእክት ክብር",
    lyrics: `ቅዱስ ሚካኤል የሰማይ መልአክ፥
በእግዚአብሔር ፊት የምትቆም ሁልጊዜ፤
ጸሎታችንን ወደ አምላክ አርስልን፥
ተራዳይን አባታችን በጭንቃችን ጊዜ።

በእሳት ሰይፍህ ጠላትን ታርቃለህ፥
የአምላክን ሕዝብ በሰላም ትጠብቃለህ፤
ሊቀ መላእክት ሚካኤል ኃያል፥
ምስጋና ላንተ ለዘለዓለም ይገባል።`,
    melodyIndex: 1,
    audioUrl: "/assets/audio/michael_angel.mp3",
  },
];
