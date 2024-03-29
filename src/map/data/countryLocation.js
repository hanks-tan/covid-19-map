/**
 * 国家位置数据（点）
 */
const countryLocation = {
  type: 'FeatureCollection',
  name: 'countryLocation',
  crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
  features: [
    { type: 'Feature', properties: { name: '安道尔', code: 'AD', name_en: 'Andorra' }, geometry: { type: 'Point', coordinates: [1.601554, 42.546245] } },
    { type: 'Feature', properties: { name: '阿联酋', code: 'AE', name_en: 'United Arab Emirates' }, geometry: { type: 'Point', coordinates: [53.847818, 23.424076] } },
    { type: 'Feature', properties: { name: '阿富汗', code: 'AF', name_en: 'Afghanistan' }, geometry: { type: 'Point', coordinates: [67.709953, 33.93911] } },
    { type: 'Feature', properties: { name: '安提瓜和巴布达', code: 'AG', name_en: 'Antigua and Barbuda' }, geometry: { type: 'Point', coordinates: [-61.796428, 17.060816] } },
    { type: 'Feature', properties: { name: 'Anguilla', code: 'AI', name_en: null }, geometry: { type: 'Point', coordinates: [-63.068615, 18.220554] } },
    { type: 'Feature', properties: { name: '阿尔巴尼亚', code: 'AL', name_en: 'Albania' }, geometry: { type: 'Point', coordinates: [20.168331, 41.153332] } },
    { type: 'Feature', properties: { name: '亚美尼亚', code: 'AM', name_en: 'Armenia' }, geometry: { type: 'Point', coordinates: [45.038189, 40.069099] } },
    { type: 'Feature', properties: { name: 'Netherlands Antilles', code: 'AN', name_en: null }, geometry: { type: 'Point', coordinates: [-69.060087, 12.226079] } },
    { type: 'Feature', properties: { name: '安哥拉', code: 'AO', name_en: 'Angola' }, geometry: { type: 'Point', coordinates: [17.873887, -11.202692] } },
    { type: 'Feature', properties: { name: 'Antarctica', code: 'AQ', name_en: null }, geometry: { type: 'Point', coordinates: [-0.071389, -75.250973] } },
    { type: 'Feature', properties: { name: '阿根廷', code: 'AR', name_en: 'Argentina' }, geometry: { type: 'Point', coordinates: [-63.616672, -38.416097] } },
    { type: 'Feature', properties: { name: '美属萨摩亚', code: 'AS', name_en: 'American Samoa' }, geometry: { type: 'Point', coordinates: [-170.132217, -14.270972] } },
    { type: 'Feature', properties: { name: '奥地利', code: 'AT', name_en: 'Austria' }, geometry: { type: 'Point', coordinates: [14.550072, 47.516231] } },
    { type: 'Feature', properties: { name: '澳大利亚', code: 'AU', name_en: 'Australia' }, geometry: { type: 'Point', coordinates: [133.775136, -25.274398] } },
    { type: 'Feature', properties: { name: 'Aruba', code: 'AW', name_en: null }, geometry: { type: 'Point', coordinates: [-69.968338, 12.52111] } },
    { type: 'Feature', properties: { name: '阿塞拜疆', code: 'AZ', name_en: 'Azerbaijan' }, geometry: { type: 'Point', coordinates: [47.576927, 40.143105] } },
    { type: 'Feature', properties: { name: '波斯尼亚和黑塞哥维那', code: 'BA', name_en: 'Bosnia and Herzegovina' }, geometry: { type: 'Point', coordinates: [17.679076, 43.915886] } },
    { type: 'Feature', properties: { name: '巴巴多斯', code: 'BB', name_en: 'Barbados' }, geometry: { type: 'Point', coordinates: [-59.543198, 13.193887] } },
    { type: 'Feature', properties: { name: '孟加拉国', code: 'BD', name_en: 'Bangladesh' }, geometry: { type: 'Point', coordinates: [90.356331, 23.684994] } },
    { type: 'Feature', properties: { name: '比利时', code: 'BE', name_en: 'Belgium' }, geometry: { type: 'Point', coordinates: [4.469936, 50.503887] } },
    { type: 'Feature', properties: { name: '布基纳法索', code: 'BF', name_en: 'Burkina Faso' }, geometry: { type: 'Point', coordinates: [-1.561593, 12.238333] } },
    { type: 'Feature', properties: { name: '保加利亚', code: 'BG', name_en: 'Bulgaria' }, geometry: { type: 'Point', coordinates: [25.48583, 42.733883] } },
    { type: 'Feature', properties: { name: '巴林', code: 'BH', name_en: 'Bahrain' }, geometry: { type: 'Point', coordinates: [50.637772, 25.930414] } },
    { type: 'Feature', properties: { name: '布隆迪', code: 'BI', name_en: 'Burundi' }, geometry: { type: 'Point', coordinates: [29.918886, -3.373056] } },
    { type: 'Feature', properties: { name: '贝宁', code: 'BJ', name_en: 'Benin' }, geometry: { type: 'Point', coordinates: [2.315834, 9.30769] } },
    { type: 'Feature', properties: { name: '百慕大', code: 'BM', name_en: 'Bermuda' }, geometry: { type: 'Point', coordinates: [-64.75737, 32.321384] } },
    { type: 'Feature', properties: { name: '文莱', code: 'BN', name_en: 'Brunei' }, geometry: { type: 'Point', coordinates: [114.727669, 4.535277] } },
    { type: 'Feature', properties: { name: '玻利维亚', code: 'BO', name_en: 'Bolivia' }, geometry: { type: 'Point', coordinates: [-63.588653, -16.290154] } },
    { type: 'Feature', properties: { name: '巴西', code: 'BR', name_en: 'Brazil' }, geometry: { type: 'Point', coordinates: [-51.92528, -14.235004] } },
    { type: 'Feature', properties: { name: '巴哈马', code: 'BS', name_en: 'Bahamas' }, geometry: { type: 'Point', coordinates: [-77.39628, 25.03428] } },
    { type: 'Feature', properties: { name: '不丹', code: 'BT', name_en: 'Bhutan' }, geometry: { type: 'Point', coordinates: [90.433601, 27.514162] } },
    { type: 'Feature', properties: { name: 'Bouvet Island', code: 'BV', name_en: null }, geometry: { type: 'Point', coordinates: [3.413194, -54.423199] } },
    { type: 'Feature', properties: { name: '博茨瓦纳', code: 'BW', name_en: 'Botswana' }, geometry: { type: 'Point', coordinates: [24.684866, -22.328474] } },
    { type: 'Feature', properties: { name: '白俄罗斯', code: 'BY', name_en: 'Belarus' }, geometry: { type: 'Point', coordinates: [27.953389, 53.709807] } },
    { type: 'Feature', properties: { name: '伯利兹', code: 'BZ', name_en: 'Belize' }, geometry: { type: 'Point', coordinates: [-88.49765, 17.189877] } },
    { type: 'Feature', properties: { name: '加拿大', code: 'CA', name_en: 'Canada' }, geometry: { type: 'Point', coordinates: [-106.346771, 56.130366] } },
    { type: 'Feature', properties: { name: 'Cocos [Keeling] Islands', code: 'CC', name_en: null }, geometry: { type: 'Point', coordinates: [96.870956, -12.164165] } },
    { type: 'Feature', properties: { name: '刚果（金）', code: 'CD', name_en: 'Congo [DRC]' }, geometry: { type: 'Point', coordinates: [21.758664, -4.038333] } },
    { type: 'Feature', properties: { name: '中非', code: 'CF', name_en: 'Central African Republic' }, geometry: { type: 'Point', coordinates: [20.939444, 6.611111] } },
    { type: 'Feature', properties: { name: '刚果（布）', code: 'CG', name_en: 'Congo [Republic]' }, geometry: { type: 'Point', coordinates: [15.827659, -0.228021] } },
    { type: 'Feature', properties: { name: '瑞士', code: 'CH', name_en: 'Switzerland' }, geometry: { type: 'Point', coordinates: [8.227512, 46.818188] } },
    { type: 'Feature', properties: { name: '科特迪瓦', code: 'CI', name_en: "Côte d'Ivoire" }, geometry: { type: 'Point', coordinates: [-5.54708, 7.539989] } },
    { type: 'Feature', properties: { name: 'Cook Islands', code: 'CK', name_en: null }, geometry: { type: 'Point', coordinates: [-159.777671, -21.236736] } },
    { type: 'Feature', properties: { name: '智利', code: 'CL', name_en: 'Chile' }, geometry: { type: 'Point', coordinates: [-71.542969, -35.675147] } },
    { type: 'Feature', properties: { name: '喀麦隆', code: 'CM', name_en: 'Cameroon' }, geometry: { type: 'Point', coordinates: [12.354722, 7.369722] } },
    { type: 'Feature', properties: { name: '中国', code: 'CN', name_en: 'China' }, geometry: { type: 'Point', coordinates: [104.195397, 35.86166] } },
    { type: 'Feature', properties: { name: '哥伦比亚', code: 'CO', name_en: 'Colombia' }, geometry: { type: 'Point', coordinates: [-74.297333, 4.570868] } },
    { type: 'Feature', properties: { name: '哥斯达黎加', code: 'CR', name_en: 'Costa Rica' }, geometry: { type: 'Point', coordinates: [-83.753428, 9.748917] } },
    { type: 'Feature', properties: { name: '古巴', code: 'CU', name_en: 'Cuba' }, geometry: { type: 'Point', coordinates: [-77.781167, 21.521757] } },
    { type: 'Feature', properties: { name: '佛得角', code: 'CV', name_en: 'Cape Verde' }, geometry: { type: 'Point', coordinates: [-24.013197, 16.002082] } },
    { type: 'Feature', properties: { name: 'Christmas Island', code: 'CX', name_en: null }, geometry: { type: 'Point', coordinates: [105.690449, -10.447525] } },
    { type: 'Feature', properties: { name: '塞浦路斯', code: 'CY', name_en: 'Cyprus' }, geometry: { type: 'Point', coordinates: [33.429859, 35.126413] } },
    { type: 'Feature', properties: { name: '捷克', code: 'CZ', name_en: 'Czech Republic' }, geometry: { type: 'Point', coordinates: [15.472962, 49.817492] } },
    { type: 'Feature', properties: { name: '德国', code: 'DE', name_en: 'Germany' }, geometry: { type: 'Point', coordinates: [10.451526, 51.165691] } },
    { type: 'Feature', properties: { name: '吉布提', code: 'DJ', name_en: 'Djibouti' }, geometry: { type: 'Point', coordinates: [42.590275, 11.825138] } },
    { type: 'Feature', properties: { name: '丹麦', code: 'DK', name_en: 'Denmark' }, geometry: { type: 'Point', coordinates: [9.501785, 56.26392] } },
    { type: 'Feature', properties: { name: '多米尼克', code: 'DM', name_en: 'Dominica' }, geometry: { type: 'Point', coordinates: [-61.370976, 15.414999] } },
    { type: 'Feature', properties: { name: '多米尼加', code: 'DO', name_en: 'Dominican Republic' }, geometry: { type: 'Point', coordinates: [-70.162651, 18.735693] } },
    { type: 'Feature', properties: { name: '阿尔及利亚', code: 'DZ', name_en: 'Algeria' }, geometry: { type: 'Point', coordinates: [1.659626, 28.033886] } },
    { type: 'Feature', properties: { name: '厄瓜多尔', code: 'EC', name_en: 'Ecuador' }, geometry: { type: 'Point', coordinates: [-78.183406, -1.831239] } },
    { type: 'Feature', properties: { name: '爱沙尼亚', code: 'EE', name_en: 'Estonia' }, geometry: { type: 'Point', coordinates: [25.013607, 58.595272] } },
    { type: 'Feature', properties: { name: '埃及', code: 'EG', name_en: 'Egypt' }, geometry: { type: 'Point', coordinates: [30.802498, 26.820553] } },
    { type: 'Feature', properties: { name: '阿拉伯撒哈拉民主共和国', code: 'EH', name_en: 'Western Sahara' }, geometry: { type: 'Point', coordinates: [-12.885834, 24.215527] } },
    { type: 'Feature', properties: { name: '厄立特里亚', code: 'ER', name_en: 'Eritrea' }, geometry: { type: 'Point', coordinates: [39.782334, 15.179384] } },
    { type: 'Feature', properties: { name: '西班牙', code: 'ES', name_en: 'Spain' }, geometry: { type: 'Point', coordinates: [-3.74922, 40.463667] } },
    { type: 'Feature', properties: { name: '埃塞俄比亚', code: 'ET', name_en: 'Ethiopia' }, geometry: { type: 'Point', coordinates: [40.489673, 9.145] } },
    { type: 'Feature', properties: { name: '芬兰', code: 'FI', name_en: 'Finland' }, geometry: { type: 'Point', coordinates: [25.748151, 61.92411] } },
    { type: 'Feature', properties: { name: '斐济', code: 'FJ', name_en: 'Fiji' }, geometry: { type: 'Point', coordinates: [179.414413, -16.578193] } },
    { type: 'Feature', properties: { name: '福克兰群岛', code: 'FK', name_en: 'Falkland Islands [Islas Malvinas]' }, geometry: { type: 'Point', coordinates: [-59.523613, -51.796253] } },
    { type: 'Feature', properties: { name: 'Micronesia', code: 'FM', name_en: null }, geometry: { type: 'Point', coordinates: [150.550812, 7.425554] } },
    { type: 'Feature', properties: { name: '法罗群岛', code: 'FO', name_en: 'Faroe Islands' }, geometry: { type: 'Point', coordinates: [-6.911806, 61.892635] } },
    { type: 'Feature', properties: { name: '法国', code: 'FR', name_en: 'France' }, geometry: { type: 'Point', coordinates: [2.213749, 46.227638] } },
    { type: 'Feature', properties: { name: '加蓬', code: 'GA', name_en: 'Gabon' }, geometry: { type: 'Point', coordinates: [11.609444, -0.803689] } },
    { type: 'Feature', properties: { name: '英国', code: 'GB', name_en: 'United Kingdom' }, geometry: { type: 'Point', coordinates: [-3.435973, 55.378051] } },
    { type: 'Feature', properties: { name: '格林纳达', code: 'GD', name_en: 'Grenada' }, geometry: { type: 'Point', coordinates: [-61.604171, 12.262776] } },
    { type: 'Feature', properties: { name: '格鲁吉亚', code: 'GE', name_en: 'Georgia' }, geometry: { type: 'Point', coordinates: [43.356892, 42.315407] } },
    { type: 'Feature', properties: { name: 'French Guiana', code: 'GF', name_en: null }, geometry: { type: 'Point', coordinates: [-53.125782, 3.933889] } },
    { type: 'Feature', properties: { name: 'Guernsey', code: 'GG', name_en: null }, geometry: { type: 'Point', coordinates: [-2.585278, 49.465691] } },
    { type: 'Feature', properties: { name: '加纳', code: 'GH', name_en: 'Ghana' }, geometry: { type: 'Point', coordinates: [-1.023194, 7.946527] } },
    { type: 'Feature', properties: { name: 'Gibraltar', code: 'GI', name_en: null }, geometry: { type: 'Point', coordinates: [-5.345374, 36.137741] } },
    { type: 'Feature', properties: { name: '格陵兰', code: 'GL', name_en: 'Greenland' }, geometry: { type: 'Point', coordinates: [-42.604303, 71.706936] } },
    { type: 'Feature', properties: { name: '冈比亚', code: 'GM', name_en: 'Gambia' }, geometry: { type: 'Point', coordinates: [-15.310139, 13.443182] } },
    { type: 'Feature', properties: { name: '几内亚', code: 'GN', name_en: 'Guinea' }, geometry: { type: 'Point', coordinates: [-9.696645, 9.945587] } },
    { type: 'Feature', properties: { name: 'Guadeloupe', code: 'GP', name_en: null }, geometry: { type: 'Point', coordinates: [-62.067641, 16.995971] } },
    { type: 'Feature', properties: { name: '赤道几内亚', code: 'GQ', name_en: 'Equatorial Guinea' }, geometry: { type: 'Point', coordinates: [10.267895, 1.650801] } },
    { type: 'Feature', properties: { name: '希腊', code: 'GR', name_en: 'Greece' }, geometry: { type: 'Point', coordinates: [21.824312, 39.074208] } },
    { type: 'Feature', properties: { name: '南乔治亚和南桑威奇群岛', code: 'GS', name_en: 'South Georgia and the South Sandwich Islands' }, geometry: { type: 'Point', coordinates: [-36.587909, -54.429579] } },
    { type: 'Feature', properties: { name: '危地马拉', code: 'GT', name_en: 'Guatemala' }, geometry: { type: 'Point', coordinates: [-90.230759, 15.783471] } },
    { type: 'Feature', properties: { name: '关岛', code: 'GU', name_en: 'Guam' }, geometry: { type: 'Point', coordinates: [144.793731, 13.444304] } },
    { type: 'Feature', properties: { name: '几内亚比绍', code: 'GW', name_en: 'Guinea-Bissau' }, geometry: { type: 'Point', coordinates: [-15.180413, 11.803749] } },
    { type: 'Feature', properties: { name: '圭亚那', code: 'GY', name_en: 'Guyana' }, geometry: { type: 'Point', coordinates: [-58.93018, 4.860416] } },
    { type: 'Feature', properties: { name: 'Gaza Strip', code: 'GZ', name_en: null }, geometry: { type: 'Point', coordinates: [34.308825, 31.354676] } },
    { type: 'Feature', properties: { name: 'Hong Kong', code: 'HK', name_en: null }, geometry: { type: 'Point', coordinates: [114.109497, 22.396428] } },
    { type: 'Feature', properties: { name: '赫德岛和麦克唐纳群岛', code: 'HM', name_en: 'Heard Island and McDonald Islands' }, geometry: { type: 'Point', coordinates: [73.504158, -53.08181] } },
    { type: 'Feature', properties: { name: '洪都拉斯', code: 'HN', name_en: 'Honduras' }, geometry: { type: 'Point', coordinates: [-86.241905, 15.199999] } },
    { type: 'Feature', properties: { name: '克罗地亚', code: 'HR', name_en: 'Croatia' }, geometry: { type: 'Point', coordinates: [15.2, 45.1] } },
    { type: 'Feature', properties: { name: '海地', code: 'HT', name_en: 'Haiti' }, geometry: { type: 'Point', coordinates: [-72.285215, 18.971187] } },
    { type: 'Feature', properties: { name: '匈牙利', code: 'HU', name_en: 'Hungary' }, geometry: { type: 'Point', coordinates: [19.503304, 47.162494] } },
    { type: 'Feature', properties: { name: '印度尼西亚', code: 'ID', name_en: 'Indonesia' }, geometry: { type: 'Point', coordinates: [113.921327, -0.789275] } },
    { type: 'Feature', properties: { name: '爱尔兰', code: 'IE', name_en: 'Ireland' }, geometry: { type: 'Point', coordinates: [-8.24389, 53.41291] } },
    { type: 'Feature', properties: { name: '以色列', code: 'IL', name_en: 'Israel' }, geometry: { type: 'Point', coordinates: [34.851612, 31.046051] } },
    { type: 'Feature', properties: { name: '马恩岛', code: 'IM', name_en: 'Isle of Man' }, geometry: { type: 'Point', coordinates: [-4.548056, 54.236107] } },
    { type: 'Feature', properties: { name: '印度', code: 'IN', name_en: 'India' }, geometry: { type: 'Point', coordinates: [78.96288, 20.593684] } },
    { type: 'Feature', properties: { name: '英属印度洋领地', code: 'IO', name_en: 'British Indian Ocean Territory' }, geometry: { type: 'Point', coordinates: [71.876519, -6.343194] } },
    { type: 'Feature', properties: { name: '伊拉克', code: 'IQ', name_en: 'Iraq' }, geometry: { type: 'Point', coordinates: [43.679291, 33.223191] } },
    { type: 'Feature', properties: { name: '伊朗', code: 'IR', name_en: 'Iran' }, geometry: { type: 'Point', coordinates: [53.688046, 32.427908] } },
    { type: 'Feature', properties: { name: '冰岛', code: 'IS', name_en: 'Iceland' }, geometry: { type: 'Point', coordinates: [-19.020835, 64.963051] } },
    { type: 'Feature', properties: { name: '意大利', code: 'IT', name_en: 'Italy' }, geometry: { type: 'Point', coordinates: [12.56738, 41.87194] } },
    { type: 'Feature', properties: { name: '泽西', code: 'JE', name_en: 'Jersey' }, geometry: { type: 'Point', coordinates: [-2.13125, 49.214439] } },
    { type: 'Feature', properties: { name: '牙买加', code: 'JM', name_en: 'Jamaica' }, geometry: { type: 'Point', coordinates: [-77.297508, 18.109581] } },
    { type: 'Feature', properties: { name: '约旦', code: 'JO', name_en: 'Jordan' }, geometry: { type: 'Point', coordinates: [36.238414, 30.585164] } },
    { type: 'Feature', properties: { name: '日本', code: 'JP', name_en: 'Japan' }, geometry: { type: 'Point', coordinates: [138.252924, 36.204824] } },
    { type: 'Feature', properties: { name: '肯尼亚', code: 'KE', name_en: 'Kenya' }, geometry: { type: 'Point', coordinates: [37.906193, -0.023559] } },
    { type: 'Feature', properties: { name: '吉尔吉斯斯坦', code: 'KG', name_en: 'Kyrgyzstan' }, geometry: { type: 'Point', coordinates: [74.766098, 41.20438] } },
    { type: 'Feature', properties: { name: '柬埔寨', code: 'KH', name_en: 'Cambodia' }, geometry: { type: 'Point', coordinates: [104.990963, 12.565679] } },
    { type: 'Feature', properties: { name: '基里巴斯', code: 'KI', name_en: 'Kiribati' }, geometry: { type: 'Point', coordinates: [-168.734039, -3.370417] } },
    { type: 'Feature', properties: { name: '科摩罗', code: 'KM', name_en: 'Comoros' }, geometry: { type: 'Point', coordinates: [43.872219, -11.875001] } },
    { type: 'Feature', properties: { name: 'Saint Kitts and Nevis', code: 'KN', name_en: null }, geometry: { type: 'Point', coordinates: [-62.782998, 17.357822] } },
    { type: 'Feature', properties: { name: '朝鲜', code: 'KP', name_en: 'North Korea' }, geometry: { type: 'Point', coordinates: [127.510093, 40.339852] } },
    { type: 'Feature', properties: { name: '韩国', code: 'KR', name_en: 'South Korea' }, geometry: { type: 'Point', coordinates: [127.766922, 35.907757] } },
    { type: 'Feature', properties: { name: '科威特', code: 'KW', name_en: 'Kuwait' }, geometry: { type: 'Point', coordinates: [47.481766, 29.31166] } },
    { type: 'Feature', properties: { name: '开曼群岛', code: 'KY', name_en: 'Cayman Islands' }, geometry: { type: 'Point', coordinates: [-80.566956, 19.513469] } },
    { type: 'Feature', properties: { name: '哈萨克斯坦', code: 'KZ', name_en: 'Kazakhstan' }, geometry: { type: 'Point', coordinates: [66.923684, 48.019573] } },
    { type: 'Feature', properties: { name: '老挝', code: 'LA', name_en: 'Laos' }, geometry: { type: 'Point', coordinates: [102.495496, 19.85627] } },
    { type: 'Feature', properties: { name: '黎巴嫩', code: 'LB', name_en: 'Lebanon' }, geometry: { type: 'Point', coordinates: [35.862285, 33.854721] } },
    { type: 'Feature', properties: { name: '圣卢西亚', code: 'LC', name_en: 'Saint Lucia' }, geometry: { type: 'Point', coordinates: [-60.978893, 13.909444] } },
    { type: 'Feature', properties: { name: '列支敦士登', code: 'LI', name_en: 'Liechtenstein' }, geometry: { type: 'Point', coordinates: [9.555373, 47.166] } },
    { type: 'Feature', properties: { name: '斯里兰卡', code: 'LK', name_en: 'Sri Lanka' }, geometry: { type: 'Point', coordinates: [80.771797, 7.873054] } },
    { type: 'Feature', properties: { name: '利比里亚', code: 'LR', name_en: 'Liberia' }, geometry: { type: 'Point', coordinates: [-9.429499, 6.428055] } },
    { type: 'Feature', properties: { name: '莱索托', code: 'LS', name_en: 'Lesotho' }, geometry: { type: 'Point', coordinates: [28.233608, -29.609988] } },
    { type: 'Feature', properties: { name: '立陶宛', code: 'LT', name_en: 'Lithuania' }, geometry: { type: 'Point', coordinates: [23.881275, 55.169438] } },
    { type: 'Feature', properties: { name: '卢森堡', code: 'LU', name_en: 'Luxembourg' }, geometry: { type: 'Point', coordinates: [6.129583, 49.815273] } },
    { type: 'Feature', properties: { name: '拉脱维亚', code: 'LV', name_en: 'Latvia' }, geometry: { type: 'Point', coordinates: [24.603189, 56.879635] } },
    { type: 'Feature', properties: { name: '利比亚', code: 'LY', name_en: 'Libya' }, geometry: { type: 'Point', coordinates: [17.228331, 26.3351] } },
    { type: 'Feature', properties: { name: '摩洛哥', code: 'MA', name_en: 'Morocco' }, geometry: { type: 'Point', coordinates: [-7.09262, 31.791702] } },
    { type: 'Feature', properties: { name: 'Monaco', code: 'MC', name_en: null }, geometry: { type: 'Point', coordinates: [7.412841, 43.750298] } },
    { type: 'Feature', properties: { name: '摩尔多瓦', code: 'MD', name_en: 'Moldova' }, geometry: { type: 'Point', coordinates: [28.369885, 47.411631] } },
    { type: 'Feature', properties: { name: '黑山', code: 'ME', name_en: 'Montenegro' }, geometry: { type: 'Point', coordinates: [19.37439, 42.708678] } },
    { type: 'Feature', properties: { name: '马达加斯加', code: 'MG', name_en: 'Madagascar' }, geometry: { type: 'Point', coordinates: [46.869107, -18.766947] } },
    { type: 'Feature', properties: { name: 'Marshall Islands', code: 'MH', name_en: null }, geometry: { type: 'Point', coordinates: [171.184478, 7.131474] } },
    { type: 'Feature', properties: { name: '北马其顿', code: 'MK', name_en: 'Macedonia [FYROM]' }, geometry: { type: 'Point', coordinates: [21.745275, 41.608635] } },
    { type: 'Feature', properties: { name: '马里', code: 'ML', name_en: 'Mali' }, geometry: { type: 'Point', coordinates: [-3.996166, 17.570692] } },
    { type: 'Feature', properties: { name: '缅甸', code: 'MM', name_en: 'Myanmar [Burma]' }, geometry: { type: 'Point', coordinates: [95.956223, 21.913965] } },
    { type: 'Feature', properties: { name: '蒙古国', code: 'MN', name_en: 'Mongolia' }, geometry: { type: 'Point', coordinates: [103.846656, 46.862496] } },
    { type: 'Feature', properties: { name: 'Macau', code: 'MO', name_en: null }, geometry: { type: 'Point', coordinates: [113.543873, 22.198745] } },
    { type: 'Feature', properties: { name: 'Northern Mariana Islands', code: 'MP', name_en: null }, geometry: { type: 'Point', coordinates: [145.38469, 17.33083] } },
    { type: 'Feature', properties: { name: 'Martinique', code: 'MQ', name_en: null }, geometry: { type: 'Point', coordinates: [-61.024174, 14.641528] } },
    { type: 'Feature', properties: { name: '毛里塔尼亚', code: 'MR', name_en: 'Mauritania' }, geometry: { type: 'Point', coordinates: [-10.940835, 21.00789] } },
    { type: 'Feature', properties: { name: '蒙特塞拉特', code: 'MS', name_en: 'Montserrat' }, geometry: { type: 'Point', coordinates: [-62.187366, 16.742498] } },
    { type: 'Feature', properties: { name: '马耳他', code: 'MT', name_en: 'Malta' }, geometry: { type: 'Point', coordinates: [14.375416, 35.937496] } },
    { type: 'Feature', properties: { name: '毛里求斯', code: 'MU', name_en: 'Mauritius' }, geometry: { type: 'Point', coordinates: [57.552152, -20.348404] } },
    { type: 'Feature', properties: { name: 'Maldives', code: 'MV', name_en: null }, geometry: { type: 'Point', coordinates: [73.22068, 3.202778] } },
    { type: 'Feature', properties: { name: '马拉维', code: 'MW', name_en: 'Malawi' }, geometry: { type: 'Point', coordinates: [34.301525, -13.254308] } },
    { type: 'Feature', properties: { name: '墨西哥', code: 'MX', name_en: 'Mexico' }, geometry: { type: 'Point', coordinates: [-102.552784, 23.634501] } },
    { type: 'Feature', properties: { name: '马来西亚', code: 'MY', name_en: 'Malaysia' }, geometry: { type: 'Point', coordinates: [101.975766, 4.210484] } },
    { type: 'Feature', properties: { name: '莫桑比克', code: 'MZ', name_en: 'Mozambique' }, geometry: { type: 'Point', coordinates: [35.529562, -18.665695] } },
    { type: 'Feature', properties: { name: '纳米比亚', code: 'NA', name_en: 'Namibia' }, geometry: { type: 'Point', coordinates: [18.49041, -22.95764] } },
    { type: 'Feature', properties: { name: '新喀里多尼亚', code: 'NC', name_en: 'New Caledonia' }, geometry: { type: 'Point', coordinates: [165.618042, -20.904305] } },
    { type: 'Feature', properties: { name: '尼日尔', code: 'NE', name_en: 'Niger' }, geometry: { type: 'Point', coordinates: [8.081666, 17.607789] } },
    { type: 'Feature', properties: { name: 'Norfolk Island', code: 'NF', name_en: null }, geometry: { type: 'Point', coordinates: [167.954712, -29.040835] } },
    { type: 'Feature', properties: { name: '尼日利亚', code: 'NG', name_en: 'Nigeria' }, geometry: { type: 'Point', coordinates: [8.675277, 9.081999] } },
    { type: 'Feature', properties: { name: '尼加拉瓜', code: 'NI', name_en: 'Nicaragua' }, geometry: { type: 'Point', coordinates: [-85.207229, 12.865416] } },
    { type: 'Feature', properties: { name: '荷兰', code: 'NL', name_en: 'Netherlands' }, geometry: { type: 'Point', coordinates: [5.291266, 52.132633] } },
    { type: 'Feature', properties: { name: '挪威', code: 'NO', name_en: 'Norway' }, geometry: { type: 'Point', coordinates: [8.468946, 60.472024] } },
    { type: 'Feature', properties: { name: '尼泊尔', code: 'NP', name_en: 'Nepal' }, geometry: { type: 'Point', coordinates: [84.124008, 28.394857] } },
    { type: 'Feature', properties: { name: 'Nauru', code: 'NR', name_en: null }, geometry: { type: 'Point', coordinates: [166.931503, -0.522778] } },
    { type: 'Feature', properties: { name: '纽埃', code: 'NU', name_en: 'Niue' }, geometry: { type: 'Point', coordinates: [-169.867233, -19.054445] } },
    { type: 'Feature', properties: { name: '新西兰', code: 'NZ', name_en: 'New Zealand' }, geometry: { type: 'Point', coordinates: [174.885971, -40.900557] } },
    { type: 'Feature', properties: { name: '阿曼', code: 'OM', name_en: 'Oman' }, geometry: { type: 'Point', coordinates: [55.923255, 21.512583] } },
    { type: 'Feature', properties: { name: '巴拿马', code: 'PA', name_en: 'Panama' }, geometry: { type: 'Point', coordinates: [-80.782127, 8.537981] } },
    { type: 'Feature', properties: { name: '秘鲁', code: 'PE', name_en: 'Peru' }, geometry: { type: 'Point', coordinates: [-75.015152, -9.189967] } },
    { type: 'Feature', properties: { name: '法属波利尼西亚', code: 'PF', name_en: 'French Polynesia' }, geometry: { type: 'Point', coordinates: [-149.406843, -17.679742] } },
    { type: 'Feature', properties: { name: '巴布亚新几内亚', code: 'PG', name_en: 'Papua New Guinea' }, geometry: { type: 'Point', coordinates: [143.95555, -6.314993] } },
    { type: 'Feature', properties: { name: '菲律宾', code: 'PH', name_en: 'Philippines' }, geometry: { type: 'Point', coordinates: [121.774017, 12.879721] } },
    { type: 'Feature', properties: { name: '巴基斯坦', code: 'PK', name_en: 'Pakistan' }, geometry: { type: 'Point', coordinates: [69.345116, 30.375321] } },
    { type: 'Feature', properties: { name: '波兰', code: 'PL', name_en: 'Poland' }, geometry: { type: 'Point', coordinates: [19.145136, 51.919438] } },
    { type: 'Feature', properties: { name: '圣皮埃尔和密克隆', code: 'PM', name_en: 'Saint Pierre and Miquelon' }, geometry: { type: 'Point', coordinates: [-56.27111, 46.941936] } },
    { type: 'Feature', properties: { name: 'Pitcairn Islands', code: 'PN', name_en: null }, geometry: { type: 'Point', coordinates: [-127.439308, -24.703615] } },
    { type: 'Feature', properties: { name: '波多黎各', code: 'PR', name_en: 'Puerto Rico' }, geometry: { type: 'Point', coordinates: [-66.590149, 18.220833] } },
    { type: 'Feature', properties: { name: 'Palestinian Territories', code: 'PS', name_en: null }, geometry: { type: 'Point', coordinates: [35.233154, 31.952162] } },
    { type: 'Feature', properties: { name: '葡萄牙', code: 'PT', name_en: 'Portugal' }, geometry: { type: 'Point', coordinates: [-8.224454, 39.399872] } },
    { type: 'Feature', properties: { name: '帕劳', code: 'PW', name_en: 'Palau' }, geometry: { type: 'Point', coordinates: [134.58252, 7.51498] } },
    { type: 'Feature', properties: { name: '巴拉圭', code: 'PY', name_en: 'Paraguay' }, geometry: { type: 'Point', coordinates: [-58.443832, -23.442503] } },
    { type: 'Feature', properties: { name: '卡塔尔', code: 'QA', name_en: 'Qatar' }, geometry: { type: 'Point', coordinates: [51.183884, 25.354826] } },
    { type: 'Feature', properties: { name: 'Réunion', code: 'RE', name_en: null }, geometry: { type: 'Point', coordinates: [55.536384, -21.115141] } },
    { type: 'Feature', properties: { name: '罗马尼亚', code: 'RO', name_en: 'Romania' }, geometry: { type: 'Point', coordinates: [24.96676, 45.943161] } },
    { type: 'Feature', properties: { name: '塞尔维亚', code: 'RS', name_en: 'Serbia' }, geometry: { type: 'Point', coordinates: [21.005859, 44.016521] } },
    { type: 'Feature', properties: { name: '俄罗斯', code: 'RU', name_en: 'Russia' }, geometry: { type: 'Point', coordinates: [105.318756, 61.52401] } },
    { type: 'Feature', properties: { name: '卢旺达', code: 'RW', name_en: 'Rwanda' }, geometry: { type: 'Point', coordinates: [29.873888, -1.940278] } },
    { type: 'Feature', properties: { name: '沙特阿拉伯', code: 'SA', name_en: 'Saudi Arabia' }, geometry: { type: 'Point', coordinates: [45.079162, 23.885942] } },
    { type: 'Feature', properties: { name: '所罗门群岛', code: 'SB', name_en: 'Solomon Islands' }, geometry: { type: 'Point', coordinates: [160.156194, -9.64571] } },
    { type: 'Feature', properties: { name: '塞舌尔', code: 'SC', name_en: 'Seychelles' }, geometry: { type: 'Point', coordinates: [55.491977, -4.679574] } },
    { type: 'Feature', properties: { name: '苏丹', code: 'SD', name_en: 'Sudan' }, geometry: { type: 'Point', coordinates: [30.217636, 12.862807] } },
    { type: 'Feature', properties: { name: '瑞典', code: 'SE', name_en: 'Sweden' }, geometry: { type: 'Point', coordinates: [18.643501, 60.128161] } },
    { type: 'Feature', properties: { name: '新加坡', code: 'SG', name_en: 'Singapore' }, geometry: { type: 'Point', coordinates: [103.819836, 1.352083] } },
    { type: 'Feature', properties: { name: '圣赫勒拿、阿森松和特里斯坦-达库尼亚', code: 'SH', name_en: 'Saint Helena' }, geometry: { type: 'Point', coordinates: [-10.030696, -24.143474] } },
    { type: 'Feature', properties: { name: '斯洛文尼亚', code: 'SI', name_en: 'Slovenia' }, geometry: { type: 'Point', coordinates: [14.995463, 46.151241] } },
    { type: 'Feature', properties: { name: 'Svalbard and Jan Mayen', code: 'SJ', name_en: null }, geometry: { type: 'Point', coordinates: [23.670272, 77.553604] } },
    { type: 'Feature', properties: { name: '斯洛伐克', code: 'SK', name_en: 'Slovakia' }, geometry: { type: 'Point', coordinates: [19.699024, 48.669026] } },
    { type: 'Feature', properties: { name: '塞拉利昂', code: 'SL', name_en: 'Sierra Leone' }, geometry: { type: 'Point', coordinates: [-11.779889, 8.460555] } },
    { type: 'Feature', properties: { name: 'San Marino', code: 'SM', name_en: null }, geometry: { type: 'Point', coordinates: [12.457777, 43.94236] } },
    { type: 'Feature', properties: { name: '塞内加尔', code: 'SN', name_en: 'Senegal' }, geometry: { type: 'Point', coordinates: [-14.452362, 14.497401] } },
    { type: 'Feature', properties: { name: '索马里', code: 'SO', name_en: 'Somalia' }, geometry: { type: 'Point', coordinates: [46.199616, 5.152149] } },
    { type: 'Feature', properties: { name: '苏里南', code: 'SR', name_en: 'Suriname' }, geometry: { type: 'Point', coordinates: [-56.027783, 3.919305] } },
    { type: 'Feature', properties: { name: '圣多美和普林西比', code: 'ST', name_en: 'São Tomé and Príncipe' }, geometry: { type: 'Point', coordinates: [6.613081, 0.18636] } },
    { type: 'Feature', properties: { name: '萨尔瓦多', code: 'SV', name_en: 'El Salvador' }, geometry: { type: 'Point', coordinates: [-88.89653, 13.794185] } },
    { type: 'Feature', properties: { name: '叙利亚', code: 'SY', name_en: 'Syria' }, geometry: { type: 'Point', coordinates: [38.996815, 34.802075] } },
    { type: 'Feature', properties: { name: '斯威士兰', code: 'SZ', name_en: 'Swaziland' }, geometry: { type: 'Point', coordinates: [31.465866, -26.522503] } },
    { type: 'Feature', properties: { name: '特克斯和凯科斯群岛', code: 'TC', name_en: 'Turks and Caicos Islands' }, geometry: { type: 'Point', coordinates: [-71.797928, 21.694025] } },
    { type: 'Feature', properties: { name: '乍得', code: 'TD', name_en: 'Chad' }, geometry: { type: 'Point', coordinates: [18.732207, 15.454166] } },
    { type: 'Feature', properties: { name: '法属南方和南极洲领地', code: 'TF', name_en: 'French Southern Territories' }, geometry: { type: 'Point', coordinates: [69.348557, -49.280366] } },
    { type: 'Feature', properties: { name: '多哥', code: 'TG', name_en: 'Togo' }, geometry: { type: 'Point', coordinates: [0.824782, 8.619543] } },
    { type: 'Feature', properties: { name: '泰国', code: 'TH', name_en: 'Thailand' }, geometry: { type: 'Point', coordinates: [100.992541, 15.870032] } },
    { type: 'Feature', properties: { name: '塔吉克斯坦', code: 'TJ', name_en: 'Tajikistan' }, geometry: { type: 'Point', coordinates: [71.276093, 38.861034] } },
    { type: 'Feature', properties: { name: 'Tokelau', code: 'TK', name_en: null }, geometry: { type: 'Point', coordinates: [-171.855881, -8.967363] } },
    { type: 'Feature', properties: { name: '东帝汶', code: 'TL', name_en: 'Timor-Leste' }, geometry: { type: 'Point', coordinates: [125.727539, -8.874217] } },
    { type: 'Feature', properties: { name: '土库曼斯坦', code: 'TM', name_en: 'Turkmenistan' }, geometry: { type: 'Point', coordinates: [59.556278, 38.969719] } },
    { type: 'Feature', properties: { name: '突尼斯', code: 'TN', name_en: 'Tunisia' }, geometry: { type: 'Point', coordinates: [9.537499, 33.886917] } },
    { type: 'Feature', properties: { name: '汤加', code: 'TO', name_en: 'Tonga' }, geometry: { type: 'Point', coordinates: [-175.198242, -21.178986] } },
    { type: 'Feature', properties: { name: '土耳其', code: 'TR', name_en: 'Turkey' }, geometry: { type: 'Point', coordinates: [35.243322, 38.963745] } },
    { type: 'Feature', properties: { name: '特立尼达和多巴哥', code: 'TT', name_en: 'Trinidad and Tobago' }, geometry: { type: 'Point', coordinates: [-61.222503, 10.691803] } },
    { type: 'Feature', properties: { name: 'Tuvalu', code: 'TV', name_en: null }, geometry: { type: 'Point', coordinates: [177.64933, -7.109535] } },
    { type: 'Feature', properties: { name: 'Taiwan', code: 'TW', name_en: null }, geometry: { type: 'Point', coordinates: [120.960515, 23.69781] } },
    { type: 'Feature', properties: { name: '坦桑尼亚', code: 'TZ', name_en: 'Tanzania' }, geometry: { type: 'Point', coordinates: [34.888822, -6.369028] } },
    { type: 'Feature', properties: { name: '乌克兰', code: 'UA', name_en: 'Ukraine' }, geometry: { type: 'Point', coordinates: [31.16558, 48.379433] } },
    { type: 'Feature', properties: { name: '乌干达', code: 'UG', name_en: 'Uganda' }, geometry: { type: 'Point', coordinates: [32.290275, 1.373333] } },
    { type: 'Feature', properties: { name: 'U.S. Minor Outlying Islands', code: 'UM', name_en: null }, geometry: null },
    { type: 'Feature', properties: { name: '美国', code: 'US', name_en: 'United States' }, geometry: { type: 'Point', coordinates: [-95.712891, 37.09024] } },
    { type: 'Feature', properties: { name: '乌拉圭', code: 'UY', name_en: 'Uruguay' }, geometry: { type: 'Point', coordinates: [-55.765835, -32.522779] } },
    { type: 'Feature', properties: { name: '乌兹别克斯坦', code: 'UZ', name_en: 'Uzbekistan' }, geometry: { type: 'Point', coordinates: [64.585262, 41.377491] } },
    { type: 'Feature', properties: { name: 'Vatican City', code: 'VA', name_en: null }, geometry: { type: 'Point', coordinates: [12.453389, 41.902916] } },
    { type: 'Feature', properties: { name: '圣文森特和格林纳丁斯', code: 'VC', name_en: 'Saint Vincent and the Grenadines' }, geometry: { type: 'Point', coordinates: [-61.287228, 12.984305] } },
    { type: 'Feature', properties: { name: '委内瑞拉', code: 'VE', name_en: 'Venezuela' }, geometry: { type: 'Point', coordinates: [-66.58973, 6.42375] } },
    { type: 'Feature', properties: { name: 'British Virgin Islands', code: 'VG', name_en: null }, geometry: { type: 'Point', coordinates: [-64.639968, 18.420695] } },
    { type: 'Feature', properties: { name: '美属维尔京群岛', code: 'VI', name_en: 'U.S. Virgin Islands' }, geometry: { type: 'Point', coordinates: [-64.896335, 18.335765] } },
    { type: 'Feature', properties: { name: '越南', code: 'VN', name_en: 'Vietnam' }, geometry: { type: 'Point', coordinates: [108.277199, 14.058324] } },
    { type: 'Feature', properties: { name: '瓦努阿图', code: 'VU', name_en: 'Vanuatu' }, geometry: { type: 'Point', coordinates: [166.959158, -15.376706] } },
    { type: 'Feature', properties: { name: 'Wallis and Futuna', code: 'WF', name_en: null }, geometry: { type: 'Point', coordinates: [-177.156097, -13.768752] } },
    { type: 'Feature', properties: { name: '萨摩亚', code: 'WS', name_en: 'Samoa' }, geometry: { type: 'Point', coordinates: [-172.104629, -13.759029] } },
    { type: 'Feature', properties: { name: 'Kosovo', code: 'XK', name_en: null }, geometry: { type: 'Point', coordinates: [20.902977, 42.602636] } },
    { type: 'Feature', properties: { name: '也门', code: 'YE', name_en: 'Yemen' }, geometry: { type: 'Point', coordinates: [48.516388, 15.552727] } },
    { type: 'Feature', properties: { name: 'Mayotte', code: 'YT', name_en: null }, geometry: { type: 'Point', coordinates: [45.166244, -12.8275] } },
    { type: 'Feature', properties: { name: '南非', code: 'ZA', name_en: 'South Africa' }, geometry: { type: 'Point', coordinates: [22.937506, -30.559482] } },
    { type: 'Feature', properties: { name: '赞比亚', code: 'ZM', name_en: 'Zambia' }, geometry: { type: 'Point', coordinates: [27.849332, -13.133897] } },
    { type: 'Feature', properties: { name: '津巴布韦', code: 'ZW', name_en: 'Zimbabwe' }, geometry: { type: 'Point', coordinates: [29.154857, -19.015438] } }
  ]
}

export default countryLocation
