import { IScoreData } from "./shared";

class ResourcesData {

    private scoreBase = [
        {
            "Rating": 3018.4940165727,
            "ID": 1719,
            "ContestSlug": "biweekly-contest-43"
        },
        {
            "Rating": 2872.0290327119,
            "ID": 1982,
            "ContestSlug": "weekly-contest-255"
        },
        {
            "Rating": 2863.1378294349,
            "ID": 770,
            "ContestSlug": "weekly-contest-68"
        },
        {
            "Rating": 2849.4841858619,
            "ID": 1728,
            "ContestSlug": "weekly-contest-224"
        },
        {
            "Rating": 2817.267212602,
            "ID": 1977,
            "ContestSlug": "biweekly-contest-59"
        },
        {
            "Rating": 2803.7652028979,
            "ID": 2060,
            "ContestSlug": "weekly-contest-265"
        },
        {
            "Rating": 2765.2533837781,
            "ID": 803,
            "ContestSlug": "weekly-contest-76"
        },
        {
            "Rating": 2690.5859406179,
            "ID": 1960,
            "ContestSlug": "biweekly-contest-58"
        },
        {
            "Rating": 2666.668150845,
            "ID": 1397,
            "ContestSlug": "weekly-contest-182"
        },
        {
            "Rating": 2661.0670044656,
            "ID": 1923,
            "ContestSlug": "weekly-contest-248"
        },
        {
            "Rating": 2655.2178711909,
            "ID": 1659,
            "ContestSlug": "weekly-contest-215"
        },
        {
            "Rating": 2650.8996457642,
            "ID": 2097,
            "ContestSlug": "weekly-contest-270"
        },
        {
            "Rating": 2648.1748409542,
            "ID": 2071,
            "ContestSlug": "biweekly-contest-65"
        },
        {
            "Rating": 2647.8258771458,
            "ID": 2386,
            "ContestSlug": "weekly-contest-307"
        },
        {
            "Rating": 2640.3824813624,
            "ID": 1787,
            "ContestSlug": "weekly-contest-231"
        },
        {
            "Rating": 2628.7957821141,
            "ID": 2213,
            "ContestSlug": "weekly-contest-285"
        },
        {
            "Rating": 2621.1208072273,
            "ID": 2281,
            "ContestSlug": "weekly-contest-294"
        },
        {
            "Rating": 2620.4181842249,
            "ID": 1830,
            "ContestSlug": "biweekly-contest-50"
        },
        {
            "Rating": 2615.1468269481,
            "ID": 2338,
            "ContestSlug": "weekly-contest-301"
        },
        {
            "Rating": 2610.9906730644,
            "ID": 2056,
            "ContestSlug": "biweekly-contest-64"
        },
        {
            "Rating": 2610.0826855063,
            "ID": 1687,
            "ContestSlug": "biweekly-contest-41"
        },
        {
            "Rating": 2594.135673452,
            "ID": 964,
            "ContestSlug": "weekly-contest-116"
        },
        {
            "Rating": 2587.8725248485,
            "ID": 1883,
            "ContestSlug": "weekly-contest-243"
        },
        {
            "Rating": 2583.9006314254,
            "ID": 2019,
            "ContestSlug": "weekly-contest-260"
        },
        {
            "Rating": 2583.406911951,
            "ID": 936,
            "ContestSlug": "weekly-contest-109"
        },
        {
            "Rating": 2575.9570281316,
            "ID": 1531,
            "ContestSlug": "weekly-contest-199"
        },
        {
            "Rating": 2571.552028121,
            "ID": 1489,
            "ContestSlug": "weekly-contest-194"
        },
        {
            "Rating": 2566.5910742837,
            "ID": 913,
            "ContestSlug": "weekly-contest-104"
        },
        {
            "Rating": 2561.7794931859,
            "ID": 2030,
            "ContestSlug": "weekly-contest-261"
        },
        {
            "Rating": 2561.508149216,
            "ID": 2234,
            "ContestSlug": "weekly-contest-288"
        },
        {
            "Rating": 2559.4351004238,
            "ID": 1815,
            "ContestSlug": "biweekly-contest-49"
        },
        {
            "Rating": 2558.3297484354,
            "ID": 2014,
            "ContestSlug": "weekly-contest-259"
        },
        {
            "Rating": 2539.863726397,
            "ID": 1819,
            "ContestSlug": "weekly-contest-235"
        },
        {
            "Rating": 2537.7965575726,
            "ID": 1595,
            "ContestSlug": "weekly-contest-207"
        },
        {
            "Rating": 2533.7796160302,
            "ID": 1948,
            "ContestSlug": "weekly-contest-251"
        },
        {
            "Rating": 2533.3027905062,
            "ID": 1675,
            "ContestSlug": "weekly-contest-217"
        },
        {
            "Rating": 2531.6452775023,
            "ID": 1896,
            "ContestSlug": "biweekly-contest-54"
        },
        {
            "Rating": 2530.6905139914,
            "ID": 1776,
            "ContestSlug": "weekly-contest-230"
        },
        {
            "Rating": 2529.5251086936,
            "ID": 1632,
            "ContestSlug": "weekly-contest-212"
        },
        {
            "Rating": 2517.6829964848,
            "ID": 2040,
            "ContestSlug": "biweekly-contest-63"
        },
        {
            "Rating": 2515.7520586008,
            "ID": 2272,
            "ContestSlug": "biweekly-contest-78"
        },
        {
            "Rating": 2502.5176603922,
            "ID": 1938,
            "ContestSlug": "weekly-contest-250"
        },
        {
            "Rating": 2499.5640490579,
            "ID": 1735,
            "ContestSlug": "biweekly-contest-44"
        },
        {
            "Rating": 2499.3282271507,
            "ID": 2157,
            "ContestSlug": "weekly-contest-278"
        },
        {
            "Rating": 2489.6652421066,
            "ID": 2035,
            "ContestSlug": "weekly-contest-262"
        },
        {
            "Rating": 2486.2339675701,
            "ID": 1916,
            "ContestSlug": "weekly-contest-247"
        },
        {
            "Rating": 2483.9435767299,
            "ID": 1932,
            "ContestSlug": "weekly-contest-249"
        },
        {
            "Rating": 2481.8722909195,
            "ID": 2289,
            "ContestSlug": "weekly-contest-295"
        },
        {
            "Rating": 2481.7175364169,
            "ID": 1330,
            "ContestSlug": "biweekly-contest-18"
        },
        {
            "Rating": 2479.3282985529,
            "ID": 1803,
            "ContestSlug": "weekly-contest-233"
        },
        {
            "Rating": 2476.7727985927,
            "ID": 2117,
            "ContestSlug": "biweekly-contest-68"
        },
        {
            "Rating": 2476.451764287,
            "ID": 1622,
            "ContestSlug": "biweekly-contest-37"
        },
        {
            "Rating": 2470.2118194809,
            "ID": 2286,
            "ContestSlug": "biweekly-contest-79"
        },
        {
            "Rating": 2466.8891773908,
            "ID": 1703,
            "ContestSlug": "biweekly-contest-42"
        },
        {
            "Rating": 2464.5077611012,
            "ID": 1994,
            "ContestSlug": "biweekly-contest-60"
        },
        {
            "Rating": 2457.115574186,
            "ID": 1782,
            "ContestSlug": "biweekly-contest-47"
        },
        {
            "Rating": 2456.3900212097,
            "ID": 1499,
            "ContestSlug": "weekly-contest-195"
        },
        {
            "Rating": 2455.8244137907,
            "ID": 1040,
            "ContestSlug": "weekly-contest-135"
        },
        {
            "Rating": 2454.7653333657,
            "ID": 1900,
            "ContestSlug": "weekly-contest-245"
        },
        {
            "Rating": 2449.1323757838,
            "ID": 2127,
            "ContestSlug": "weekly-contest-274"
        },
        {
            "Rating": 2439.7337408636,
            "ID": 1872,
            "ContestSlug": "weekly-contest-242"
        },
        {
            "Rating": 2433.3767704629,
            "ID": 903,
            "ContestSlug": "weekly-contest-101"
        },
        {
            "Rating": 2429.6705422448,
            "ID": 782,
            "ContestSlug": "weekly-contest-71"
        },
        {
            "Rating": 2429.0940568399,
            "ID": 1998,
            "ContestSlug": "weekly-contest-257"
        },
        {
            "Rating": 2428.7985254341,
            "ID": 1044,
            "ContestSlug": "weekly-contest-136"
        },
        {
            "Rating": 2422.5309771173,
            "ID": 1000,
            "ContestSlug": "weekly-contest-126"
        },
        {
            "Rating": 2422.3128048015,
            "ID": 1987,
            "ContestSlug": "weekly-contest-256"
        },
        {
            "Rating": 2418.5742747632,
            "ID": 1203,
            "ContestSlug": "weekly-contest-155"
        },
        {
            "Rating": 2415.0089731911,
            "ID": 2003,
            "ContestSlug": "weekly-contest-258"
        },
        {
            "Rating": 2413.3969129689,
            "ID": 1928,
            "ContestSlug": "biweekly-contest-56"
        },
        {
            "Rating": 2409.7580728676,
            "ID": 1388,
            "ContestSlug": "biweekly-contest-22"
        },
        {
            "Rating": 2399.5729141925,
            "ID": 920,
            "ContestSlug": "weekly-contest-105"
        },
        {
            "Rating": 2396.6267778669,
            "ID": 808,
            "ContestSlug": "weekly-contest-78"
        },
        {
            "Rating": 2395.8765531206,
            "ID": 1825,
            "ContestSlug": "weekly-contest-236"
        },
        {
            "Rating": 2392.0799451298,
            "ID": 2172,
            "ContestSlug": "weekly-contest-280"
        },
        {
            "Rating": 2391.8086687918,
            "ID": 818,
            "ContestSlug": "weekly-contest-80"
        },
        {
            "Rating": 2391.657270733,
            "ID": 2322,
            "ContestSlug": "weekly-contest-299"
        },
        {
            "Rating": 2389.9634276167,
            "ID": 1681,
            "ContestSlug": "weekly-contest-218"
        },
        {
            "Rating": 2385.8072128533,
            "ID": 1349,
            "ContestSlug": "weekly-contest-175"
        },
        {
            "Rating": 2383.7724811656,
            "ID": 1521,
            "ContestSlug": "weekly-contest-198"
        },
        {
            "Rating": 2381.479024858,
            "ID": 956,
            "ContestSlug": "weekly-contest-114"
        },
        {
            "Rating": 2381.2160234811,
            "ID": 2334,
            "ContestSlug": "biweekly-contest-82"
        },
        {
            "Rating": 2378.6234112504,
            "ID": 757,
            "ContestSlug": "weekly-contest-65"
        },
        {
            "Rating": 2377.3895801187,
            "ID": 854,
            "ContestSlug": "weekly-contest-89"
        },
        {
            "Rating": 2376.8658923518,
            "ID": 887,
            "ContestSlug": "weekly-contest-97"
        },
        {
            "Rating": 2374.1850487395,
            "ID": 1840,
            "ContestSlug": "weekly-contest-238"
        },
        {
            "Rating": 2366.7099607655,
            "ID": 1183,
            "ContestSlug": "biweekly-contest-8"
        },
        {
            "Rating": 2364.3930657709,
            "ID": 2132,
            "ContestSlug": "biweekly-contest-69"
        },
        {
            "Rating": 2364.3455634374,
            "ID": 2203,
            "ContestSlug": "weekly-contest-284"
        },
        {
            "Rating": 2363.5096568214,
            "ID": 1755,
            "ContestSlug": "weekly-contest-227"
        },
        {
            "Rating": 2363.0240184484,
            "ID": 2312,
            "ContestSlug": "weekly-contest-298"
        },
        {
            "Rating": 2362.6480880348,
            "ID": 1520,
            "ContestSlug": "weekly-contest-198"
        },
        {
            "Rating": 2358.9669560824,
            "ID": 1707,
            "ContestSlug": "weekly-contest-221"
        },
        {
            "Rating": 2356.5811122453,
            "ID": 1467,
            "ContestSlug": "weekly-contest-191"
        },
        {
            "Rating": 2350.9694374861,
            "ID": 1713,
            "ContestSlug": "weekly-contest-222"
        },
        {
            "Rating": 2350.0380300939,
            "ID": 837,
            "ContestSlug": "weekly-contest-85"
        },
        {
            "Rating": 2348.5159376523,
            "ID": 1096,
            "ContestSlug": "weekly-contest-142"
        },
        {
            "Rating": 2346.5717839654,
            "ID": 2258,
            "ContestSlug": "biweekly-contest-77"
        },
        {
            "Rating": 2345.3418191684,
            "ID": 1611,
            "ContestSlug": "weekly-contest-209"
        },
        {
            "Rating": 2341.4506355884,
            "ID": 810,
            "ContestSlug": "weekly-contest-78"
        },
        {
            "Rating": 2336.5210003185,
            "ID": 1505,
            "ContestSlug": "weekly-contest-196"
        },
        {
            "Rating": 2333.2401505813,
            "ID": 1674,
            "ContestSlug": "weekly-contest-217"
        },
        {
            "Rating": 2333.0621537307,
            "ID": 1866,
            "ContestSlug": "weekly-contest-241"
        },
        {
            "Rating": 2333.0078041754,
            "ID": 1585,
            "ContestSlug": "weekly-contest-206"
        },
        {
            "Rating": 2328.4294689238,
            "ID": 882,
            "ContestSlug": "weekly-contest-96"
        },
        {
            "Rating": 2315.6037017989,
            "ID": 1187,
            "ContestSlug": "weekly-contest-153"
        },
        {
            "Rating": 2315.0547336936,
            "ID": 2188,
            "ContestSlug": "weekly-contest-282"
        },
        {
            "Rating": 2312.9919953644,
            "ID": 1857,
            "ContestSlug": "weekly-contest-240"
        },
        {
            "Rating": 2310.3824631335,
            "ID": 1959,
            "ContestSlug": "biweekly-contest-58"
        },
        {
            "Rating": 2308.6545905335,
            "ID": 1617,
            "ContestSlug": "weekly-contest-210"
        },
        {
            "Rating": 2307.0161713185,
            "ID": 1655,
            "ContestSlug": "biweekly-contest-39"
        },
        {
            "Rating": 2306.8472649456,
            "ID": 862,
            "ContestSlug": "weekly-contest-91"
        },
        {
            "Rating": 2305.4498281454,
            "ID": 2306,
            "ContestSlug": "weekly-contest-297"
        },
        {
            "Rating": 2304.3094138939,
            "ID": 2242,
            "ContestSlug": "biweekly-contest-76"
        },
        {
            "Rating": 2300.1557840589,
            "ID": 1697,
            "ContestSlug": "weekly-contest-220"
        },
        {
            "Rating": 2297.105362516,
            "ID": 1263,
            "ContestSlug": "weekly-contest-163"
        },
        {
            "Rating": 2294.0981174197,
            "ID": 932,
            "ContestSlug": "weekly-contest-108"
        },
        {
            "Rating": 2292.1434666805,
            "ID": 761,
            "ContestSlug": "weekly-contest-66"
        },
        {
            "Rating": 2290.9040038639,
            "ID": 1591,
            "ContestSlug": "biweekly-contest-35"
        },
        {
            "Rating": 2288.2117442123,
            "ID": 1569,
            "ContestSlug": "weekly-contest-204"
        },
        {
            "Rating": 2286.1378742318,
            "ID": 1851,
            "ContestSlug": "weekly-contest-239"
        },
        {
            "Rating": 2284.4463940346,
            "ID": 1723,
            "ContestSlug": "weekly-contest-223"
        },
        {
            "Rating": 2280.3143643878,
            "ID": 2407,
            "ContestSlug": "weekly-contest-310"
        },
        {
            "Rating": 2277.3595662538,
            "ID": 2029,
            "ContestSlug": "weekly-contest-261"
        },
        {
            "Rating": 2277.0238076464,
            "ID": 749,
            "ContestSlug": "weekly-contest-63"
        },
        {
            "Rating": 2276.4233585631,
            "ID": 1498,
            "ContestSlug": "weekly-contest-195"
        },
        {
            "Rating": 2275.7337818748,
            "ID": 1606,
            "ContestSlug": "biweekly-contest-36"
        },
        {
            "Rating": 2273.7910625337,
            "ID": 753,
            "ContestSlug": "weekly-contest-64"
        },
        {
            "Rating": 2273.2215764545,
            "ID": 1434,
            "ContestSlug": "biweekly-contest-25"
        },
        {
            "Rating": 2272.4412003208,
            "ID": 2179,
            "ContestSlug": "biweekly-contest-72"
        },
        {
            "Rating": 2272.1122260637,
            "ID": 952,
            "ContestSlug": "weekly-contest-113"
        },
        {
            "Rating": 2265.2118886972,
            "ID": 2141,
            "ContestSlug": "weekly-contest-276"
        },
        {
            "Rating": 2260.2799775623,
            "ID": 1997,
            "ContestSlug": "weekly-contest-257"
        },
        {
            "Rating": 2259.6572191969,
            "ID": 857,
            "ContestSlug": "weekly-contest-90"
        },
        {
            "Rating": 2258.6371797452,
            "ID": 864,
            "ContestSlug": "weekly-contest-92"
        },
        {
            "Rating": 2250.9318291559,
            "ID": 1125,
            "ContestSlug": "weekly-contest-145"
        },
        {
            "Rating": 2250.2578740769,
            "ID": 1199,
            "ContestSlug": "biweekly-contest-9"
        },
        {
            "Rating": 2250.0454791316,
            "ID": 1307,
            "ContestSlug": "weekly-contest-169"
        },
        {
            "Rating": 2246.8671174565,
            "ID": 960,
            "ContestSlug": "weekly-contest-115"
        },
        {
            "Rating": 2246.0452639352,
            "ID": 2183,
            "ContestSlug": "weekly-contest-281"
        },
        {
            "Rating": 2241.5199974312,
            "ID": 1240,
            "ContestSlug": "weekly-contest-160"
        },
        {
            "Rating": 2235.9672341699,
            "ID": 850,
            "ContestSlug": "weekly-contest-88"
        },
        {
            "Rating": 2234.9191877602,
            "ID": 1915,
            "ContestSlug": "weekly-contest-247"
        },
        {
            "Rating": 2233.963903408,
            "ID": 1178,
            "ContestSlug": "weekly-contest-152"
        },
        {
            "Rating": 2231.8099102949,
            "ID": 1766,
            "ContestSlug": "biweekly-contest-46"
        },
        {
            "Rating": 2230.1673059455,
            "ID": 1012,
            "ContestSlug": "weekly-contest-128"
        },
        {
            "Rating": 2225.3877535768,
            "ID": 2163,
            "ContestSlug": "biweekly-contest-71"
        },
        {
            "Rating": 2222.4805422748,
            "ID": 2276,
            "ContestSlug": "weekly-contest-293"
        },
        {
            "Rating": 2221.7336557442,
            "ID": 1542,
            "ContestSlug": "biweekly-contest-32"
        },
        {
            "Rating": 2221.3538766773,
            "ID": 1627,
            "ContestSlug": "weekly-contest-211"
        },
        {
            "Rating": 2220.0903365738,
            "ID": 2223,
            "ContestSlug": "biweekly-contest-75"
        },
        {
            "Rating": 2219.3465296423,
            "ID": 2167,
            "ContestSlug": "weekly-contest-279"
        },
        {
            "Rating": 2217.8090802563,
            "ID": 2025,
            "ContestSlug": "biweekly-contest-62"
        },
        {
            "Rating": 2214.4798747386,
            "ID": 1889,
            "ContestSlug": "weekly-contest-244"
        },
        {
            "Rating": 2210.3503183571,
            "ID": 992,
            "ContestSlug": "weekly-contest-123"
        },
        {
            "Rating": 2209.8815936961,
            "ID": 2081,
            "ContestSlug": "weekly-contest-268"
        },
        {
            "Rating": 2208.5532172086,
            "ID": 1568,
            "ContestSlug": "weekly-contest-204"
        },
        {
            "Rating": 2207.8565809952,
            "ID": 1649,
            "ContestSlug": "weekly-contest-214"
        },
        {
            "Rating": 2205.4304373587,
            "ID": 1157,
            "ContestSlug": "weekly-contest-149"
        },
        {
            "Rating": 2204.3524370174,
            "ID": 879,
            "ContestSlug": "weekly-contest-95"
        },
        {
            "Rating": 2203.1738850937,
            "ID": 1246,
            "ContestSlug": "biweekly-contest-12"
        },
        {
            "Rating": 2201.8209584221,
            "ID": 1453,
            "ContestSlug": "weekly-contest-189"
        },
        {
            "Rating": 2201.6219336792,
            "ID": 2045,
            "ContestSlug": "weekly-contest-263"
        },
        {
            "Rating": 2200.6623666057,
            "ID": 847,
            "ContestSlug": "weekly-contest-87"
        },
        {
            "Rating": 2198.4642973466,
            "ID": 1739,
            "ContestSlug": "weekly-contest-225"
        },
        {
            "Rating": 2198.3290662783,
            "ID": 1621,
            "ContestSlug": "biweekly-contest-37"
        },
        {
            "Rating": 2197.0951445919,
            "ID": 834,
            "ContestSlug": "weekly-contest-84"
        },
        {
            "Rating": 2190.1757477854,
            "ID": 1478,
            "ContestSlug": "biweekly-contest-28"
        },
        {
            "Rating": 2189.3802630548,
            "ID": 1074,
            "ContestSlug": "weekly-contest-139"
        },
        {
            "Rating": 2185.5444704515,
            "ID": 943,
            "ContestSlug": "weekly-contest-111"
        },
        {
            "Rating": 2184.5241011615,
            "ID": 1081,
            "ContestSlug": "weekly-contest-140"
        },
        {
            "Rating": 2182.6180030785,
            "ID": 891,
            "ContestSlug": "weekly-contest-98"
        },
        {
            "Rating": 2182.054452981,
            "ID": 1771,
            "ContestSlug": "weekly-contest-229"
        },
        {
            "Rating": 2181.7821188042,
            "ID": 1912,
            "ContestSlug": "biweekly-contest-55"
        },
        {
            "Rating": 2178.4249114144,
            "ID": 2065,
            "ContestSlug": "weekly-contest-266"
        },
        {
            "Rating": 2175.6850426027,
            "ID": 1420,
            "ContestSlug": "weekly-contest-185"
        },
        {
            "Rating": 2171.716066664,
            "ID": 1691,
            "ContestSlug": "weekly-contest-219"
        },
        {
            "Rating": 2170.1079846744,
            "ID": 1862,
            "ContestSlug": "biweekly-contest-52"
        },
        {
            "Rating": 2170.0439693714,
            "ID": 1931,
            "ContestSlug": "weekly-contest-249"
        },
        {
            "Rating": 2168.7531235448,
            "ID": 786,
            "ContestSlug": "weekly-contest-72"
        },
        {
            "Rating": 2164.8287157213,
            "ID": 1036,
            "ContestSlug": "weekly-contest-134"
        },
        {
            "Rating": 2158.8988728254,
            "ID": 2122,
            "ContestSlug": "weekly-contest-273"
        },
        {
            "Rating": 2158.7683843245,
            "ID": 2102,
            "ContestSlug": "biweekly-contest-67"
        },
        {
            "Rating": 2157.5814371481,
            "ID": 2218,
            "ContestSlug": "weekly-contest-286"
        },
        {
            "Rating": 2156.9515428364,
            "ID": 1515,
            "ContestSlug": "weekly-contest-197"
        },
        {
            "Rating": 2147.1828941776,
            "ID": 1610,
            "ContestSlug": "weekly-contest-209"
        },
        {
            "Rating": 2146.639581998,
            "ID": 1906,
            "ContestSlug": "weekly-contest-246"
        },
        {
            "Rating": 2145.183995267,
            "ID": 1879,
            "ContestSlug": "biweekly-contest-53"
        },
        {
            "Rating": 2140.0220703954,
            "ID": 906,
            "ContestSlug": "weekly-contest-102"
        },
        {
            "Rating": 2137.5633267453,
            "ID": 2290,
            "ContestSlug": "weekly-contest-295"
        },
        {
            "Rating": 2136.3013259524,
            "ID": 2382,
            "ContestSlug": "biweekly-contest-85"
        },
        {
            "Rating": 2135.5738659086,
            "ID": 959,
            "ContestSlug": "weekly-contest-115"
        },
        {
            "Rating": 2134.5448970405,
            "ID": 910,
            "ContestSlug": "weekly-contest-103"
        },
        {
            "Rating": 2133.9592509012,
            "ID": 1439,
            "ContestSlug": "weekly-contest-187"
        },
        {
            "Rating": 2133.1003195919,
            "ID": 898,
            "ContestSlug": "weekly-contest-100"
        },
        {
            "Rating": 2131.7917160422,
            "ID": 1579,
            "ContestSlug": "weekly-contest-205"
        },
        {
            "Rating": 2130.9348604091,
            "ID": 2076,
            "ContestSlug": "weekly-contest-267"
        },
        {
            "Rating": 2130.1135718486,
            "ID": 1039,
            "ContestSlug": "weekly-contest-135"
        },
        {
            "Rating": 2129.7051442916,
            "ID": 798,
            "ContestSlug": "weekly-contest-75"
        },
        {
            "Rating": 2126.6864346508,
            "ID": 1444,
            "ContestSlug": "weekly-contest-188"
        },
        {
            "Rating": 2126.3922279277,
            "ID": 2246,
            "ContestSlug": "weekly-contest-289"
        },
        {
            "Rating": 2125.3125624762,
            "ID": 1955,
            "ContestSlug": "weekly-contest-252"
        },
        {
            "Rating": 2124.1329592058,
            "ID": 968,
            "ContestSlug": "weekly-contest-117"
        },
        {
            "Rating": 2124.0317207867,
            "ID": 1654,
            "ContestSlug": "biweekly-contest-39"
        },
        {
            "Rating": 2123.5708982185,
            "ID": 1970,
            "ContestSlug": "weekly-contest-254"
        },
        {
            "Rating": 2121.3147151648,
            "ID": 972,
            "ContestSlug": "weekly-contest-118"
        },
        {
            "Rating": 2120.4466386371,
            "ID": 2376,
            "ContestSlug": "weekly-contest-306"
        },
        {
            "Rating": 2118.7923652824,
            "ID": 1601,
            "ContestSlug": "weekly-contest-208"
        },
        {
            "Rating": 2116.493528295,
            "ID": 1547,
            "ContestSlug": "weekly-contest-201"
        },
        {
            "Rating": 2115.0911494487,
            "ID": 1483,
            "ContestSlug": "weekly-contest-193"
        },
        {
            "Rating": 2109.9830154953,
            "ID": 1172,
            "ContestSlug": "weekly-contest-151"
        },
        {
            "Rating": 2105.8582288624,
            "ID": 2209,
            "ContestSlug": "biweekly-contest-74"
        },
        {
            "Rating": 2105.7761215397,
            "ID": 1937,
            "ContestSlug": "weekly-contest-250"
        },
        {
            "Rating": 2104.9526046945,
            "ID": 1944,
            "ContestSlug": "biweekly-contest-57"
        },
        {
            "Rating": 2104.7441214305,
            "ID": 2088,
            "ContestSlug": "biweekly-contest-66"
        },
        {
            "Rating": 2100.3248877105,
            "ID": 793,
            "ContestSlug": "weekly-contest-74"
        },
        {
            "Rating": 2096.6201393558,
            "ID": 778,
            "ContestSlug": "weekly-contest-70"
        },
        {
            "Rating": 2096.6098086765,
            "ID": 899,
            "ContestSlug": "weekly-contest-100"
        },
        {
            "Rating": 2094.592426537,
            "ID": 1976,
            "ContestSlug": "biweekly-contest-59"
        },
        {
            "Rating": 2092.8943149547,
            "ID": 2402,
            "ContestSlug": "weekly-contest-309"
        },
        {
            "Rating": 2092.4861692502,
            "ID": 1049,
            "ContestSlug": "weekly-contest-137"
        },
        {
            "Rating": 2092.0222850837,
            "ID": 2412,
            "ContestSlug": "biweekly-contest-87"
        },
        {
            "Rating": 2091.3820373571,
            "ID": 1383,
            "ContestSlug": "weekly-contest-180"
        },
        {
            "Rating": 2090.6800569319,
            "ID": 2193,
            "ContestSlug": "biweekly-contest-73"
        },
        {
            "Rating": 2090.4183788498,
            "ID": 2318,
            "ContestSlug": "biweekly-contest-81"
        },
        {
            "Rating": 2087.2049275667,
            "ID": 1563,
            "ContestSlug": "weekly-contest-203"
        },
        {
            "Rating": 2084.9697035674,
            "ID": 982,
            "ContestSlug": "weekly-contest-121"
        },
        {
            "Rating": 2084.6866916045,
            "ID": 1192,
            "ContestSlug": "weekly-contest-154"
        },
        {
            "Rating": 2084.5752686737,
            "ID": 2267,
            "ContestSlug": "weekly-contest-292"
        },
        {
            "Rating": 2084.4980206639,
            "ID": 2009,
            "ContestSlug": "biweekly-contest-61"
        },
        {
            "Rating": 2084.2010769193,
            "ID": 774,
            "ContestSlug": "weekly-contest-69"
        },
        {
            "Rating": 2084.1404698713,
            "ID": 2050,
            "ContestSlug": "weekly-contest-264"
        },
        {
            "Rating": 2081.8087755451,
            "ID": 1494,
            "ContestSlug": "biweekly-contest-29"
        },
        {
            "Rating": 2081.7518764643,
            "ID": 1847,
            "ContestSlug": "biweekly-contest-51"
        },
        {
            "Rating": 2081.6909344021,
            "ID": 1639,
            "ContestSlug": "biweekly-contest-38"
        },
        {
            "Rating": 2080.0425875741,
            "ID": 1718,
            "ContestSlug": "biweekly-contest-43"
        },
        {
            "Rating": 2079.9846866239,
            "ID": 1643,
            "ContestSlug": "weekly-contest-213"
        },
        {
            "Rating": 2079.1911227043,
            "ID": 975,
            "ContestSlug": "weekly-contest-119"
        },
        {
            "Rating": 2078.6986769435,
            "ID": 1712,
            "ContestSlug": "weekly-contest-222"
        },
        {
            "Rating": 2078.5417326415,
            "ID": 1786,
            "ContestSlug": "weekly-contest-231"
        },
        {
            "Rating": 2077.5054883516,
            "ID": 843,
            "ContestSlug": "weekly-contest-86"
        },
        {
            "Rating": 2076.8975497986,
            "ID": 1088,
            "ContestSlug": "biweekly-contest-2"
        },
        {
            "Rating": 2075.9046975409,
            "ID": 2354,
            "ContestSlug": "weekly-contest-303"
        },
        {
            "Rating": 2074.4120526679,
            "ID": 871,
            "ContestSlug": "weekly-contest-93"
        },
        {
            "Rating": 2073.0124645606,
            "ID": 1850,
            "ContestSlug": "weekly-contest-239"
        },
        {
            "Rating": 2072.7264178313,
            "ID": 1799,
            "ContestSlug": "biweekly-contest-48"
        },
        {
            "Rating": 2070.2102619334,
            "ID": 1808,
            "ContestSlug": "weekly-contest-234"
        },
        {
            "Rating": 2069.4030284676,
            "ID": 1168,
            "ContestSlug": "biweekly-contest-7"
        },
        {
            "Rating": 2068.806637566,
            "ID": 1368,
            "ContestSlug": "weekly-contest-178"
        },
        {
            "Rating": 2068.0043466118,
            "ID": 1770,
            "ContestSlug": "weekly-contest-229"
        },
        {
            "Rating": 2067.0643721733,
            "ID": 855,
            "ContestSlug": "weekly-contest-89"
        },
        {
            "Rating": 2066.0972575597,
            "ID": 801,
            "ContestSlug": "weekly-contest-76"
        },
        {
            "Rating": 2062.9876807625,
            "ID": 2156,
            "ContestSlug": "weekly-contest-278"
        },
        {
            "Rating": 2062.3601158741,
            "ID": 2106,
            "ContestSlug": "weekly-contest-271"
        },
        {
            "Rating": 2060.379991517,
            "ID": 2366,
            "ContestSlug": "biweekly-contest-84"
        },
        {
            "Rating": 2059.4040623264,
            "ID": 1131,
            "ContestSlug": "weekly-contest-146"
        },
        {
            "Rating": 2057.4788263111,
            "ID": 2197,
            "ContestSlug": "weekly-contest-283"
        },
        {
            "Rating": 2056.335494216,
            "ID": 1473,
            "ContestSlug": "weekly-contest-192"
        },
        {
            "Rating": 2055.0970201875,
            "ID": 1575,
            "ContestSlug": "biweekly-contest-34"
        },
        {
            "Rating": 2053.7468090497,
            "ID": 839,
            "ContestSlug": "weekly-contest-85"
        },
        {
            "Rating": 2051.0879431258,
            "ID": 1856,
            "ContestSlug": "weekly-contest-240"
        },
        {
            "Rating": 2050.715977457,
            "ID": 1224,
            "ContestSlug": "weekly-contest-158"
        },
        {
            "Rating": 2050.2553211463,
            "ID": 1648,
            "ContestSlug": "weekly-contest-214"
        },
        {
            "Rating": 2048.0976546787,
            "ID": 1553,
            "ContestSlug": "weekly-contest-202"
        },
        {
            "Rating": 2040.5621123027,
            "ID": 1751,
            "ContestSlug": "biweekly-contest-45"
        },
        {
            "Rating": 2040.539289037,
            "ID": 1371,
            "ContestSlug": "biweekly-contest-21"
        },
        {
            "Rating": 2039.110874689,
            "ID": 1201,
            "ContestSlug": "weekly-contest-155"
        },
        {
            "Rating": 2038.8592725467,
            "ID": 1590,
            "ContestSlug": "biweekly-contest-35"
        },
        {
            "Rating": 2037.6527962599,
            "ID": 2116,
            "ContestSlug": "biweekly-contest-68"
        },
        {
            "Rating": 2036.7410194704,
            "ID": 2245,
            "ContestSlug": "weekly-contest-289"
        },
        {
            "Rating": 2036.7206020719,
            "ID": 1348,
            "ContestSlug": "weekly-contest-175"
        },
        {
            "Rating": 2034.9740902393,
            "ID": 1140,
            "ContestSlug": "weekly-contest-147"
        },
        {
            "Rating": 2034.9420578559,
            "ID": 1335,
            "ContestSlug": "weekly-contest-173"
        },
        {
            "Rating": 2034.6759416871,
            "ID": 947,
            "ContestSlug": "weekly-contest-112"
        },
        {
            "Rating": 2034.4067304341,
            "ID": 828,
            "ContestSlug": "weekly-contest-83"
        },
        {
            "Rating": 2033.4597721985,
            "ID": 2136,
            "ContestSlug": "weekly-contest-275"
        },
        {
            "Rating": 2033.1699277531,
            "ID": 2262,
            "ContestSlug": "weekly-contest-291"
        },
        {
            "Rating": 2032.4773038683,
            "ID": 1425,
            "ContestSlug": "weekly-contest-186"
        },
        {
            "Rating": 2029.1301557536,
            "ID": 1231,
            "ContestSlug": "biweekly-contest-11"
        },
        {
            "Rating": 2027.8772739639,
            "ID": 895,
            "ContestSlug": "weekly-contest-99"
        },
        {
            "Rating": 2027.7304121046,
            "ID": 1320,
            "ContestSlug": "weekly-contest-171"
        },
        {
            "Rating": 2027.3839266711,
            "ID": 1626,
            "ContestSlug": "weekly-contest-211"
        },
        {
            "Rating": 2026.8957817007,
            "ID": 1406,
            "ContestSlug": "weekly-contest-183"
        },
        {
            "Rating": 2025.1529365814,
            "ID": 1067,
            "ContestSlug": "biweekly-contest-1"
        },
        {
            "Rating": 2025.0377429311,
            "ID": 751,
            "ContestSlug": "weekly-contest-64"
        },
        {
            "Rating": 2024.3797833173,
            "ID": 1734,
            "ContestSlug": "biweekly-contest-44"
        },
        {
            "Rating": 2022.8520613737,
            "ID": 1235,
            "ContestSlug": "weekly-contest-159"
        },
        {
            "Rating": 2022.4752963768,
            "ID": 1210,
            "ContestSlug": "weekly-contest-156"
        },
        {
            "Rating": 2022.3137128296,
            "ID": 2251,
            "ContestSlug": "weekly-contest-290"
        },
        {
            "Rating": 2021.7790710467,
            "ID": 2271,
            "ContestSlug": "biweekly-contest-78"
        },
        {
            "Rating": 2019.5399647546,
            "ID": 909,
            "ContestSlug": "weekly-contest-103"
        },
        {
            "Rating": 2015.7291888336,
            "ID": 1353,
            "ContestSlug": "weekly-contest-176"
        },
        {
            "Rating": 2014.7655493665,
            "ID": 1354,
            "ContestSlug": "weekly-contest-176"
        },
        {
            "Rating": 2014.2979320644,
            "ID": 1105,
            "ContestSlug": "weekly-contest-143"
        },
        {
            "Rating": 2011.3542735398,
            "ID": 1102,
            "ContestSlug": "biweekly-contest-3"
        },
        {
            "Rating": 2011.0496162515,
            "ID": 2333,
            "ContestSlug": "biweekly-contest-82"
        },
        {
            "Rating": 2010.5524756946,
            "ID": 880,
            "ContestSlug": "weekly-contest-96"
        },
        {
            "Rating": 2009.7322365973,
            "ID": 1981,
            "ContestSlug": "weekly-contest-255"
        },
        {
            "Rating": 2008.40650791,
            "ID": 1223,
            "ContestSlug": "weekly-contest-158"
        },
        {
            "Rating": 2005.5862669078,
            "ID": 1888,
            "ContestSlug": "weekly-contest-244"
        },
        {
            "Rating": 2005.2755755378,
            "ID": 1761,
            "ContestSlug": "weekly-contest-228"
        },
        {
            "Rating": 2004.5346526204,
            "ID": 1927,
            "ContestSlug": "biweekly-contest-56"
        },
        {
            "Rating": 2003.5794613668,
            "ID": 2092,
            "ContestSlug": "weekly-contest-269"
        },
        {
            "Rating": 2001.2074132383,
            "ID": 2328,
            "ContestSlug": "weekly-contest-300"
        },
        {
            "Rating": 2000.8441804448,
            "ID": 1686,
            "ContestSlug": "biweekly-contest-41"
        },
        {
            "Rating": 2000.8021428612,
            "ID": 911,
            "ContestSlug": "weekly-contest-103"
        },
        {
            "Rating": 1999.1208076854,
            "ID": 765,
            "ContestSlug": "weekly-contest-67"
        },
        {
            "Rating": 1997.7013718153,
            "ID": 2250,
            "ContestSlug": "weekly-contest-290"
        },
        {
            "Rating": 1997.1824403719,
            "ID": 1274,
            "ContestSlug": "biweekly-contest-14"
        },
        {
            "Rating": 1995.2937073376,
            "ID": 1986,
            "ContestSlug": "weekly-contest-256"
        },
        {
            "Rating": 1994.3618892548,
            "ID": 927,
            "ContestSlug": "weekly-contest-107"
        },
        {
            "Rating": 1992.0032292739,
            "ID": 1625,
            "ContestSlug": "weekly-contest-211"
        },
        {
            "Rating": 1990.7738526153,
            "ID": 963,
            "ContestSlug": "weekly-contest-116"
        },
        {
            "Rating": 1990.2800994214,
            "ID": 756,
            "ContestSlug": "weekly-contest-65"
        },
        {
            "Rating": 1989.5369509422,
            "ID": 902,
            "ContestSlug": "weekly-contest-101"
        },
        {
            "Rating": 1985.2504512337,
            "ID": 928,
            "ContestSlug": "weekly-contest-107"
        },
        {
            "Rating": 1985.2417520906,
            "ID": 940,
            "ContestSlug": "weekly-contest-110"
        },
        {
            "Rating": 1983.70440706,
            "ID": 1733,
            "ContestSlug": "biweekly-contest-44"
        },
        {
            "Rating": 1983.2319731313,
            "ID": 1250,
            "ContestSlug": "weekly-contest-161"
        },
        {
            "Rating": 1982.5085994817,
            "ID": 805,
            "ContestSlug": "weekly-contest-77"
        },
        {
            "Rating": 1979.9454101467,
            "ID": 2151,
            "ContestSlug": "weekly-contest-277"
        },
        {
            "Rating": 1979.1323403633,
            "ID": 1278,
            "ContestSlug": "weekly-contest-165"
        },
        {
            "Rating": 1979.1112273597,
            "ID": 1882,
            "ContestSlug": "weekly-contest-243"
        },
        {
            "Rating": 1976.7214151234,
            "ID": 1092,
            "ContestSlug": "weekly-contest-141"
        },
        {
            "Rating": 1975.5726300727,
            "ID": 907,
            "ContestSlug": "weekly-contest-102"
        },
        {
            "Rating": 1973.7407637067,
            "ID": 1488,
            "ContestSlug": "weekly-contest-194"
        },
        {
            "Rating": 1970.4608098164,
            "ID": 1032,
            "ContestSlug": "weekly-contest-133"
        },
        {
            "Rating": 1969.9845549158,
            "ID": 835,
            "ContestSlug": "weekly-contest-84"
        },
        {
            "Rating": 1969.2019235672,
            "ID": 1943,
            "ContestSlug": "biweekly-contest-57"
        },
        {
            "Rating": 1967.3284576938,
            "ID": 1293,
            "ContestSlug": "weekly-contest-167"
        },
        {
            "Rating": 1966.7067914206,
            "ID": 1969,
            "ContestSlug": "weekly-contest-254"
        },
        {
            "Rating": 1964.3793590858,
            "ID": 815,
            "ContestSlug": "weekly-contest-79"
        },
        {
            "Rating": 1962.3314335449,
            "ID": 802,
            "ContestSlug": "weekly-contest-76"
        },
        {
            "Rating": 1962.2005269503,
            "ID": 1642,
            "ContestSlug": "weekly-contest-213"
        },
        {
            "Rating": 1961.4987013156,
            "ID": 1537,
            "ContestSlug": "weekly-contest-200"
        },
        {
            "Rating": 1960.5763266754,
            "ID": 2350,
            "ContestSlug": "biweekly-contest-83"
        },
        {
            "Rating": 1960.5517123728,
            "ID": 2392,
            "ContestSlug": "weekly-contest-308"
        },
        {
            "Rating": 1956.7059585934,
            "ID": 1463,
            "ContestSlug": "biweekly-contest-27"
        },
        {
            "Rating": 1954.2533254344,
            "ID": 1696,
            "ContestSlug": "weekly-contest-220"
        },
        {
            "Rating": 1952.7073399331,
            "ID": 1737,
            "ContestSlug": "weekly-contest-225"
        },
        {
            "Rating": 1951.3509259668,
            "ID": 1259,
            "ContestSlug": "biweekly-contest-13"
        },
        {
            "Rating": 1951.2096212775,
            "ID": 1690,
            "ContestSlug": "weekly-contest-219"
        },
        {
            "Rating": 1949.0920823355,
            "ID": 1153,
            "ContestSlug": "biweekly-contest-6"
        },
        {
            "Rating": 1947.5013967785,
            "ID": 1631,
            "ContestSlug": "weekly-contest-212"
        },
        {
            "Rating": 1945.7515607928,
            "ID": 1793,
            "ContestSlug": "weekly-contest-232"
        },
        {
            "Rating": 1945.5095833982,
            "ID": 1482,
            "ContestSlug": "weekly-contest-193"
        },
        {
            "Rating": 1944.5673996888,
            "ID": 2227,
            "ContestSlug": "weekly-contest-287"
        },
        {
            "Rating": 1940.6002290953,
            "ID": 2111,
            "ContestSlug": "weekly-contest-272"
        },
        {
            "Rating": 1939.9323330472,
            "ID": 1760,
            "ContestSlug": "weekly-contest-228"
        },
        {
            "Rating": 1938.6883365596,
            "ID": 777,
            "ContestSlug": "weekly-contest-70"
        },
        {
            "Rating": 1938.2224916289,
            "ID": 866,
            "ContestSlug": "weekly-contest-92"
        },
        {
            "Rating": 1938.0586460002,
            "ID": 2411,
            "ContestSlug": "biweekly-contest-87"
        },
        {
            "Rating": 1936.6613414859,
            "ID": 813,
            "ContestSlug": "weekly-contest-79"
        },
        {
            "Rating": 1934.3556201811,
            "ID": 1818,
            "ContestSlug": "weekly-contest-235"
        },
        {
            "Rating": 1933.9571917853,
            "ID": 827,
            "ContestSlug": "weekly-contest-82"
        },
        {
            "Rating": 1933.2169470617,
            "ID": 1964,
            "ContestSlug": "weekly-contest-253"
        },
        {
            "Rating": 1932.3730795204,
            "ID": 996,
            "ContestSlug": "weekly-contest-124"
        },
        {
            "Rating": 1931.7335479582,
            "ID": 1574,
            "ContestSlug": "biweekly-contest-34"
        },
        {
            "Rating": 1931.0849921121,
            "ID": 1798,
            "ContestSlug": "biweekly-contest-48"
        },
        {
            "Rating": 1929.9086934334,
            "ID": 1705,
            "ContestSlug": "weekly-contest-221"
        },
        {
            "Rating": 1929.897343316,
            "ID": 2018,
            "ContestSlug": "weekly-contest-260"
        },
        {
            "Rating": 1929.3184180196,
            "ID": 1802,
            "ContestSlug": "weekly-contest-233"
        },
        {
            "Rating": 1928.2304187946,
            "ID": 1562,
            "ContestSlug": "weekly-contest-203"
        },
        {
            "Rating": 1927.4000816649,
            "ID": 1449,
            "ContestSlug": "biweekly-contest-26"
        },
        {
            "Rating": 1926.7059583253,
            "ID": 1727,
            "ContestSlug": "weekly-contest-224"
        },
        {
            "Rating": 1924.964639491,
            "ID": 1745,
            "ContestSlug": "weekly-contest-226"
        },
        {
            "Rating": 1919.7433862082,
            "ID": 1552,
            "ContestSlug": "weekly-contest-202"
        },
        {
            "Rating": 1919.6391896894,
            "ID": 1416,
            "ContestSlug": "biweekly-contest-24"
        },
        {
            "Rating": 1919.1749818083,
            "ID": 1130,
            "ContestSlug": "weekly-contest-146"
        },
        {
            "Rating": 1918.9960035055,
            "ID": 2069,
            "ContestSlug": "biweekly-contest-65"
        },
        {
            "Rating": 1917.2145829853,
            "ID": 2398,
            "ContestSlug": "biweekly-contest-86"
        },
        {
            "Rating": 1916.0689858272,
            "ID": 1043,
            "ContestSlug": "weekly-contest-136"
        },
        {
            "Rating": 1914.6717285348,
            "ID": 2147,
            "ContestSlug": "biweekly-contest-70"
        },
        {
            "Rating": 1913.6704728453,
            "ID": 1373,
            "ContestSlug": "biweekly-contest-21"
        },
        {
            "Rating": 1912.8455659711,
            "ID": 1671,
            "ContestSlug": "biweekly-contest-40"
        },
        {
            "Rating": 1912.8440554296,
            "ID": 1898,
            "ContestSlug": "weekly-contest-245"
        },
        {
            "Rating": 1912.0829958001,
            "ID": 1147,
            "ContestSlug": "weekly-contest-148"
        },
        {
            "Rating": 1911.8282317986,
            "ID": 2296,
            "ContestSlug": "weekly-contest-296"
        },
        {
            "Rating": 1911.7063530593,
            "ID": 2049,
            "ContestSlug": "weekly-contest-264"
        },
        {
            "Rating": 1911.1959516695,
            "ID": 873,
            "ContestSlug": "weekly-contest-94"
        },
        {
            "Rating": 1909.4189035523,
            "ID": 991,
            "ContestSlug": "weekly-contest-123"
        },
        {
            "Rating": 1908.3866125757,
            "ID": 1124,
            "ContestSlug": "weekly-contest-145"
        },
        {
            "Rating": 1900.8434122725,
            "ID": 1665,
            "ContestSlug": "weekly-contest-216"
        },
        {
            "Rating": 1899.6213866649,
            "ID": 823,
            "ContestSlug": "weekly-contest-81"
        },
        {
            "Rating": 1897.5516652727,
            "ID": 1878,
            "ContestSlug": "biweekly-contest-53"
        },
        {
            "Rating": 1897.3309169423,
            "ID": 780,
            "ContestSlug": "weekly-contest-71"
        },
        {
            "Rating": 1897.1863301576,
            "ID": 2360,
            "ContestSlug": "weekly-contest-304"
        },
        {
            "Rating": 1896.7975214446,
            "ID": 878,
            "ContestSlug": "weekly-contest-95"
        },
        {
            "Rating": 1896.1411567598,
            "ID": 1871,
            "ContestSlug": "weekly-contest-242"
        },
        {
            "Rating": 1893.5143805402,
            "ID": 2327,
            "ContestSlug": "weekly-contest-300"
        },
        {
            "Rating": 1892.1600619469,
            "ID": 1722,
            "ContestSlug": "weekly-contest-223"
        },
        {
            "Rating": 1886.7040111218,
            "ID": 2305,
            "ContestSlug": "weekly-contest-297"
        },
        {
            "Rating": 1885.9015646531,
            "ID": 2064,
            "ContestSlug": "weekly-contest-266"
        },
        {
            "Rating": 1885.1051527272,
            "ID": 1066,
            "ContestSlug": "biweekly-contest-1"
        },
        {
            "Rating": 1885.0178370385,
            "ID": 1326,
            "ContestSlug": "weekly-contest-172"
        },
        {
            "Rating": 1883.3541964032,
            "ID": 2054,
            "ContestSlug": "biweekly-contest-64"
        },
        {
            "Rating": 1881.6810367589,
            "ID": 1255,
            "ContestSlug": "weekly-contest-162"
        },
        {
            "Rating": 1880.7433591583,
            "ID": 858,
            "ContestSlug": "weekly-contest-90"
        },
        {
            "Rating": 1880.5909929633,
            "ID": 1536,
            "ContestSlug": "weekly-contest-200"
        },
        {
            "Rating": 1880.4226853663,
            "ID": 1106,
            "ContestSlug": "weekly-contest-143"
        },
        {
            "Rating": 1880.3261182293,
            "ID": 754,
            "ContestSlug": "weekly-contest-65"
        },
        {
            "Rating": 1880.0511044074,
            "ID": 2101,
            "ContestSlug": "biweekly-contest-67"
        },
        {
            "Rating": 1877.8983358307,
            "ID": 1234,
            "ContestSlug": "weekly-contest-159"
        },
        {
            "Rating": 1877.5624603804,
            "ID": 752,
            "ContestSlug": "weekly-contest-64"
        },
        {
            "Rating": 1876.3854625677,
            "ID": 955,
            "ContestSlug": "weekly-contest-114"
        },
        {
            "Rating": 1876.3611046625,
            "ID": 1838,
            "ContestSlug": "weekly-contest-238"
        },
        {
            "Rating": 1876.146019008,
            "ID": 1392,
            "ContestSlug": "weekly-contest-181"
        },
        {
            "Rating": 1874.6468976233,
            "ID": 1015,
            "ContestSlug": "weekly-contest-129"
        },
        {
            "Rating": 1873.0367582475,
            "ID": 1001,
            "ContestSlug": "weekly-contest-125"
        },
        {
            "Rating": 1872.0350138774,
            "ID": 1526,
            "ContestSlug": "biweekly-contest-31"
        },
        {
            "Rating": 1871.8245218615,
            "ID": 2008,
            "ContestSlug": "biweekly-contest-61"
        },
        {
            "Rating": 1871.3112059413,
            "ID": 1589,
            "ContestSlug": "biweekly-contest-35"
        },
        {
            "Rating": 1869.402439128,
            "ID": 2002,
            "ContestSlug": "weekly-contest-258"
        },
        {
            "Rating": 1868.9864493463,
            "ID": 2212,
            "ContestSlug": "weekly-contest-285"
        },
        {
            "Rating": 1868.9146755896,
            "ID": 924,
            "ContestSlug": "weekly-contest-106"
        },
        {
            "Rating": 1868.1914861381,
            "ID": 1616,
            "ContestSlug": "weekly-contest-210"
        },
        {
            "Rating": 1867.9916069568,
            "ID": 1717,
            "ContestSlug": "biweekly-contest-43"
        },
        {
            "Rating": 1867.8619694847,
            "ID": 1605,
            "ContestSlug": "biweekly-contest-36"
        },
        {
            "Rating": 1866.3014601125,
            "ID": 1340,
            "ContestSlug": "weekly-contest-174"
        },
        {
            "Rating": 1865.3441063734,
            "ID": 2039,
            "ContestSlug": "biweekly-contest-63"
        },
        {
            "Rating": 1864.0948676111,
            "ID": 1163,
            "ContestSlug": "weekly-contest-150"
        },
        {
            "Rating": 1861.4906863586,
            "ID": 1993,
            "ContestSlug": "biweekly-contest-60"
        },
        {
            "Rating": 1860.742934291,
            "ID": 1996,
            "ContestSlug": "weekly-contest-257"
        },
        {
            "Rating": 1860.5166780235,
            "ID": 2301,
            "ContestSlug": "biweekly-contest-80"
        },
        {
            "Rating": 1858.9581916885,
            "ID": 1744,
            "ContestSlug": "weekly-contest-226"
        },
        {
            "Rating": 1857.6431822094,
            "ID": 1584,
            "ContestSlug": "weekly-contest-206"
        },
        {
            "Rating": 1856.8610192187,
            "ID": 2266,
            "ContestSlug": "weekly-contest-292"
        },
        {
            "Rating": 1855.5957296285,
            "ID": 799,
            "ContestSlug": "weekly-contest-75"
        },
        {
            "Rating": 1855.4479039876,
            "ID": 1202,
            "ContestSlug": "weekly-contest-155"
        },
        {
            "Rating": 1855.377046154,
            "ID": 1546,
            "ContestSlug": "weekly-contest-201"
        },
        {
            "Rating": 1854.9547783559,
            "ID": 1334,
            "ContestSlug": "weekly-contest-173"
        },
        {
            "Rating": 1854.0126399812,
            "ID": 1269,
            "ContestSlug": "weekly-contest-164"
        },
        {
            "Rating": 1853.0880092558,
            "ID": 1301,
            "ContestSlug": "biweekly-contest-16"
        },
        {
            "Rating": 1851.7255023016,
            "ID": 2162,
            "ContestSlug": "biweekly-contest-71"
        },
        {
            "Rating": 1850.8490524791,
            "ID": 1152,
            "ContestSlug": "biweekly-contest-6"
        },
        {
            "Rating": 1850.5506342426,
            "ID": 1477,
            "ContestSlug": "biweekly-contest-28"
        },
        {
            "Rating": 1850.4091449367,
            "ID": 1775,
            "ContestSlug": "weekly-contest-230"
        },
        {
            "Rating": 1849.8122180044,
            "ID": 2059,
            "ContestSlug": "weekly-contest-265"
        },
        {
            "Rating": 1848.0912848518,
            "ID": 1177,
            "ContestSlug": "weekly-contest-152"
        },
        {
            "Rating": 1847.2077654978,
            "ID": 1258,
            "ContestSlug": "biweekly-contest-13"
        },
        {
            "Rating": 1846.4077077642,
            "ID": 1514,
            "ContestSlug": "weekly-contest-197"
        },
        {
            "Rating": 1846.3568350016,
            "ID": 874,
            "ContestSlug": "weekly-contest-94"
        },
        {
            "Rating": 1845.0428731248,
            "ID": 1504,
            "ContestSlug": "weekly-contest-196"
        },
        {
            "Rating": 1844.6289439644,
            "ID": 1411,
            "ContestSlug": "weekly-contest-184"
        },
        {
            "Rating": 1841.4067816266,
            "ID": 2013,
            "ContestSlug": "weekly-contest-259"
        },
        {
            "Rating": 1840.9122452886,
            "ID": 2332,
            "ContestSlug": "biweekly-contest-82"
        },
        {
            "Rating": 1839.9203623221,
            "ID": 2311,
            "ContestSlug": "weekly-contest-298"
        },
        {
            "Rating": 1837.8252904904,
            "ID": 1559,
            "ContestSlug": "biweekly-contest-33"
        },
        {
            "Rating": 1836.536348078,
            "ID": 1316,
            "ContestSlug": "biweekly-contest-17"
        },
        {
            "Rating": 1836.5345744332,
            "ID": 2146,
            "ContestSlug": "biweekly-contest-70"
        },
        {
            "Rating": 1835.4868365659,
            "ID": 995,
            "ContestSlug": "weekly-contest-124"
        },
        {
            "Rating": 1834.868034709,
            "ID": 2370,
            "ContestSlug": "weekly-contest-305"
        },
        {
            "Rating": 1832.2280384591,
            "ID": 755,
            "ContestSlug": "weekly-contest-65"
        },
        {
            "Rating": 1831.9395911303,
            "ID": 2034,
            "ContestSlug": "weekly-contest-262"
        },
        {
            "Rating": 1830.3165569278,
            "ID": 980,
            "ContestSlug": "weekly-contest-120"
        },
        {
            "Rating": 1830.1493771696,
            "ID": 790,
            "ContestSlug": "weekly-contest-73"
        },
        {
            "Rating": 1828.6438563573,
            "ID": 1754,
            "ContestSlug": "weekly-contest-227"
        },
        {
            "Rating": 1828.2700238306,
            "ID": 2135,
            "ContestSlug": "weekly-contest-275"
        },
        {
            "Rating": 1827.090740222,
            "ID": 1095,
            "ContestSlug": "weekly-contest-142"
        },
        {
            "Rating": 1825.770486008,
            "ID": 934,
            "ContestSlug": "weekly-contest-109"
        },
        {
            "Rating": 1825.4207082682,
            "ID": 1702,
            "ContestSlug": "biweekly-contest-42"
        },
        {
            "Rating": 1825.0056908946,
            "ID": 1835,
            "ContestSlug": "weekly-contest-237"
        },
        {
            "Rating": 1824.829446341,
            "ID": 1298,
            "ContestSlug": "weekly-contest-168"
        },
        {
            "Rating": 1823.8779711373,
            "ID": 1377,
            "ContestSlug": "weekly-contest-179"
        },
        {
            "Rating": 1823.5831437787,
            "ID": 1458,
            "ContestSlug": "weekly-contest-190"
        },
        {
            "Rating": 1822.9768689716,
            "ID": 1363,
            "ContestSlug": "weekly-contest-177"
        },
        {
            "Rating": 1822.1301265412,
            "ID": 2217,
            "ContestSlug": "weekly-contest-286"
        },
        {
            "Rating": 1820.58557644,
            "ID": 1405,
            "ContestSlug": "weekly-contest-183"
        },
        {
            "Rating": 1819.3068421506,
            "ID": 2055,
            "ContestSlug": "biweekly-contest-64"
        },
        {
            "Rating": 1818.0024504436,
            "ID": 861,
            "ContestSlug": "weekly-contest-91"
        },
        {
            "Rating": 1817.9978644712,
            "ID": 1792,
            "ContestSlug": "weekly-contest-232"
        },
        {
            "Rating": 1817.224026292,
            "ID": 1658,
            "ContestSlug": "weekly-contest-215"
        },
        {
            "Rating": 1817.0597073686,
            "ID": 795,
            "ContestSlug": "weekly-contest-74"
        },
        {
            "Rating": 1815.1286459024,
            "ID": 773,
            "ContestSlug": "weekly-contest-69"
        },
        {
            "Rating": 1810.7690062079,
            "ID": 1284,
            "ContestSlug": "weekly-contest-166"
        },
        {
            "Rating": 1809.8192888474,
            "ID": 1345,
            "ContestSlug": "biweekly-contest-19"
        },
        {
            "Rating": 1809.5579156134,
            "ID": 776,
            "ContestSlug": "weekly-contest-70"
        },
        {
            "Rating": 1808.787108831,
            "ID": 1519,
            "ContestSlug": "weekly-contest-198"
        },
        {
            "Rating": 1808.5754920785,
            "ID": 1230,
            "ContestSlug": "biweekly-contest-11"
        },
        {
            "Rating": 1808.3407696613,
            "ID": 2302,
            "ContestSlug": "biweekly-contest-80"
        },
        {
            "Rating": 1807.4618172386,
            "ID": 1594,
            "ContestSlug": "weekly-contest-207"
        },
        {
            "Rating": 1806.5891699944,
            "ID": 1073,
            "ContestSlug": "weekly-contest-139"
        },
        {
            "Rating": 1805.5947071171,
            "ID": 1035,
            "ContestSlug": "weekly-contest-134"
        },
        {
            "Rating": 1804.5783242151,
            "ID": 1080,
            "ContestSlug": "weekly-contest-140"
        },
        {
            "Rating": 1804.5283324227,
            "ID": 2096,
            "ContestSlug": "weekly-contest-270"
        },
        {
            "Rating": 1803.7518552874,
            "ID": 1953,
            "ContestSlug": "weekly-contest-252"
        },
        {
            "Rating": 1802.2256875356,
            "ID": 1673,
            "ContestSlug": "weekly-contest-217"
        },
        {
            "Rating": 1799.4635458535,
            "ID": 1186,
            "ContestSlug": "weekly-contest-153"
        },
        {
            "Rating": 1797.8728515982,
            "ID": 1711,
            "ContestSlug": "weekly-contest-222"
        },
        {
            "Rating": 1797.7466000366,
            "ID": 1834,
            "ContestSlug": "weekly-contest-237"
        },
        {
            "Rating": 1797.5851607225,
            "ID": 1072,
            "ContestSlug": "weekly-contest-139"
        },
        {
            "Rating": 1797.4917663632,
            "ID": 1028,
            "ContestSlug": "weekly-contest-132"
        },
        {
            "Rating": 1795.0422250815,
            "ID": 966,
            "ContestSlug": "weekly-contest-117"
        },
        {
            "Rating": 1794.5827898448,
            "ID": 886,
            "ContestSlug": "weekly-contest-97"
        },
        {
            "Rating": 1793.8027487553,
            "ID": 1653,
            "ContestSlug": "biweekly-contest-39"
        },
        {
            "Rating": 1793.3037316825,
            "ID": 2381,
            "ContestSlug": "biweekly-contest-85"
        },
        {
            "Rating": 1792.076794537,
            "ID": 1245,
            "ContestSlug": "biweekly-contest-12"
        },
        {
            "Rating": 1790.5747006625,
            "ID": 2321,
            "ContestSlug": "weekly-contest-299"
        },
        {
            "Rating": 1787.8550568757,
            "ID": 2192,
            "ContestSlug": "biweekly-contest-73"
        },
        {
            "Rating": 1787.6346864268,
            "ID": 768,
            "ContestSlug": "weekly-contest-68"
        },
        {
            "Rating": 1787.4514432151,
            "ID": 1156,
            "ContestSlug": "weekly-contest-149"
        },
        {
            "Rating": 1787.2310751136,
            "ID": 1497,
            "ContestSlug": "weekly-contest-195"
        },
        {
            "Rating": 1786.9268132617,
            "ID": 1510,
            "ContestSlug": "biweekly-contest-30"
        },
        {
            "Rating": 1786.688543054,
            "ID": 1312,
            "ContestSlug": "weekly-contest-170"
        },
        {
            "Rating": 1786.5491561897,
            "ID": 971,
            "ContestSlug": "weekly-contest-118"
        },
        {
            "Rating": 1786.4753467293,
            "ID": 787,
            "ContestSlug": "weekly-contest-72"
        },
        {
            "Rating": 1786.3121598293,
            "ID": 983,
            "ContestSlug": "weekly-contest-121"
        },
        {
            "Rating": 1785.6872758693,
            "ID": 1911,
            "ContestSlug": "biweekly-contest-55"
        },
        {
            "Rating": 1784.2539813582,
            "ID": 894,
            "ContestSlug": "weekly-contest-99"
        },
        {
            "Rating": 1783.2337340478,
            "ID": 851,
            "ContestSlug": "weekly-contest-88"
        },
        {
            "Rating": 1782.9801784101,
            "ID": 1765,
            "ContestSlug": "biweekly-contest-46"
        },
        {
            "Rating": 1782.3312212058,
            "ID": 1171,
            "ContestSlug": "weekly-contest-151"
        },
        {
            "Rating": 1781.8156963676,
            "ID": 2353,
            "ContestSlug": "weekly-contest-303"
        },
        {
            "Rating": 1781.3664141686,
            "ID": 1895,
            "ContestSlug": "biweekly-contest-54"
        },
        {
            "Rating": 1779.9495819318,
            "ID": 842,
            "ContestSlug": "weekly-contest-86"
        },
        {
            "Rating": 1779.8364613072,
            "ID": 1424,
            "ContestSlug": "weekly-contest-186"
        },
        {
            "Rating": 1779.7534349429,
            "ID": 1129,
            "ContestSlug": "weekly-contest-146"
        },
        {
            "Rating": 1779.7001728541,
            "ID": 2369,
            "ContestSlug": "weekly-contest-305"
        },
        {
            "Rating": 1779.3931248179,
            "ID": 1016,
            "ContestSlug": "weekly-contest-129"
        },
        {
            "Rating": 1778.4880620629,
            "ID": 1824,
            "ContestSlug": "weekly-contest-236"
        },
        {
            "Rating": 1777.3786570233,
            "ID": 918,
            "ContestSlug": "weekly-contest-105"
        },
        {
            "Rating": 1774.8764591297,
            "ID": 1238,
            "ContestSlug": "weekly-contest-160"
        },
        {
            "Rating": 1770.8924569497,
            "ID": 1146,
            "ContestSlug": "weekly-contest-148"
        },
        {
            "Rating": 1768.623896829,
            "ID": 1600,
            "ContestSlug": "weekly-contest-208"
        },
        {
            "Rating": 1766.2506177612,
            "ID": 1914,
            "ContestSlug": "weekly-contest-247"
        },
        {
            "Rating": 1765.5654059263,
            "ID": 875,
            "ContestSlug": "weekly-contest-94"
        },
        {
            "Rating": 1764.9170564773,
            "ID": 1706,
            "ContestSlug": "weekly-contest-221"
        },
        {
            "Rating": 1762.3115124143,
            "ID": 948,
            "ContestSlug": "weekly-contest-112"
        },
        {
            "Rating": 1762.0307532652,
            "ID": 1262,
            "ContestSlug": "weekly-contest-163"
        },
        {
            "Rating": 1760.9131492436,
            "ID": 2121,
            "ContestSlug": "weekly-contest-273"
        },
        {
            "Rating": 1759.2287478055,
            "ID": 2075,
            "ContestSlug": "weekly-contest-267"
        },
        {
            "Rating": 1759.0197295594,
            "ID": 1541,
            "ContestSlug": "biweekly-contest-32"
        },
        {
            "Rating": 1758.75255141,
            "ID": 1027,
            "ContestSlug": "weekly-contest-132"
        },
        {
            "Rating": 1758.5135073787,
            "ID": 1954,
            "ContestSlug": "weekly-contest-252"
        },
        {
            "Rating": 1753.9062487685,
            "ID": 1216,
            "ContestSlug": "biweekly-contest-10"
        },
        {
            "Rating": 1753.4775753993,
            "ID": 764,
            "ContestSlug": "weekly-contest-67"
        },
        {
            "Rating": 1752.9555725796,
            "ID": 1135,
            "ContestSlug": "biweekly-contest-5"
        },
        {
            "Rating": 1752.2621077596,
            "ID": 939,
            "ContestSlug": "weekly-contest-110"
        },
        {
            "Rating": 1751.5101577001,
            "ID": 2166,
            "ContestSlug": "weekly-contest-279"
        },
        {
            "Rating": 1751.115625465,
            "ID": 2400,
            "ContestSlug": "weekly-contest-309"
        },
        {
            "Rating": 1749.5432375672,
            "ID": 2401,
            "ContestSlug": "weekly-contest-309"
        },
        {
            "Rating": 1749.4981778209,
            "ID": 1111,
            "ContestSlug": "weekly-contest-144"
        },
        {
            "Rating": 1748.4522689101,
            "ID": 2134,
            "ContestSlug": "weekly-contest-275"
        },
        {
            "Rating": 1748.1523771585,
            "ID": 1297,
            "ContestSlug": "weekly-contest-168"
        },
        {
            "Rating": 1748.1339100823,
            "ID": 2171,
            "ContestSlug": "weekly-contest-280"
        },
        {
            "Rating": 1747.6755111029,
            "ID": 1191,
            "ContestSlug": "weekly-contest-154"
        },
        {
            "Rating": 1746.8757919578,
            "ID": 1849,
            "ContestSlug": "weekly-contest-239"
        },
        {
            "Rating": 1746.135917977,
            "ID": 1024,
            "ContestSlug": "weekly-contest-131"
        },
        {
            "Rating": 1745.6580748712,
            "ID": 1530,
            "ContestSlug": "weekly-contest-199"
        },
        {
            "Rating": 1745.6490739887,
            "ID": 1391,
            "ContestSlug": "weekly-contest-181"
        },
        {
            "Rating": 1744.7611048301,
            "ID": 1638,
            "ContestSlug": "biweekly-contest-38"
        },
        {
            "Rating": 1744.0388789755,
            "ID": 1139,
            "ContestSlug": "weekly-contest-147"
        },
        {
            "Rating": 1743.731976554,
            "ID": 2087,
            "ContestSlug": "biweekly-contest-66"
        },
        {
            "Rating": 1741.4527995252,
            "ID": 1145,
            "ContestSlug": "weekly-contest-148"
        },
        {
            "Rating": 1740.5014205942,
            "ID": 1079,
            "ContestSlug": "weekly-contest-140"
        },
        {
            "Rating": 1739.5831401172,
            "ID": 1593,
            "ContestSlug": "weekly-contest-207"
        },
        {
            "Rating": 1737.8431142688,
            "ID": 1814,
            "ContestSlug": "biweekly-contest-49"
        },
        {
            "Rating": 1734.8208369949,
            "ID": 1292,
            "ContestSlug": "weekly-contest-167"
        },
        {
            "Rating": 1734.0550202798,
            "ID": 2048,
            "ContestSlug": "weekly-contest-264"
        },
        {
            "Rating": 1732.7813534239,
            "ID": 1273,
            "ContestSlug": "biweekly-contest-14"
        },
        {
            "Rating": 1731.5555445321,
            "ID": 889,
            "ContestSlug": "weekly-contest-98"
        },
        {
            "Rating": 1730.3052054913,
            "ID": 1014,
            "ContestSlug": "weekly-contest-129"
        },
        {
            "Rating": 1729.6074000215,
            "ID": 1220,
            "ContestSlug": "weekly-contest-157"
        },
        {
            "Rating": 1725.4481937307,
            "ID": 1011,
            "ContestSlug": "weekly-contest-128"
        },
        {
            "Rating": 1725.1995150882,
            "ID": 2416,
            "ContestSlug": "weekly-contest-311"
        },
        {
            "Rating": 1724.394164934,
            "ID": 2261,
            "ContestSlug": "weekly-contest-291"
        },
        {
            "Rating": 1724.1545485476,
            "ID": 2070,
            "ContestSlug": "biweekly-contest-65"
        },
        {
            "Rating": 1722.8129701098,
            "ID": 1359,
            "ContestSlug": "biweekly-contest-20"
        },
        {
            "Rating": 1722.3088173214,
            "ID": 1197,
            "ContestSlug": "biweekly-contest-9"
        },
        {
            "Rating": 1719.945199874,
            "ID": 1239,
            "ContestSlug": "weekly-contest-160"
        },
        {
            "Rating": 1718.9772466681,
            "ID": 2017,
            "ContestSlug": "weekly-contest-260"
        },
        {
            "Rating": 1718.8256321624,
            "ID": 2397,
            "ContestSlug": "biweekly-contest-86"
        },
        {
            "Rating": 1716.9721777,
            "ID": 2202,
            "ContestSlug": "weekly-contest-284"
        },
        {
            "Rating": 1714.992763701,
            "ID": 2359,
            "ContestSlug": "weekly-contest-304"
        },
        {
            "Rating": 1714.6960124182,
            "ID": 1781,
            "ContestSlug": "biweekly-contest-47"
        },
        {
            "Rating": 1713.3954468582,
            "ID": 2406,
            "ContestSlug": "weekly-contest-310"
        },
        {
            "Rating": 1713.2768268466,
            "ID": 1372,
            "ContestSlug": "biweekly-contest-21"
        },
        {
            "Rating": 1712.4010133221,
            "ID": 1042,
            "ContestSlug": "weekly-contest-136"
        },
        {
            "Rating": 1711.4873176824,
            "ID": 2385,
            "ContestSlug": "weekly-contest-307"
        },
        {
            "Rating": 1711.1205064321,
            "ID": 1801,
            "ContestSlug": "weekly-contest-233"
        },
        {
            "Rating": 1710.9105378431,
            "ID": 923,
            "ContestSlug": "weekly-contest-106"
        },
        {
            "Rating": 1710.3243520032,
            "ID": 1567,
            "ContestSlug": "weekly-contest-204"
        },
        {
            "Rating": 1710.1120861153,
            "ID": 759,
            "ContestSlug": "weekly-contest-66"
        },
        {
            "Rating": 1710.0787625377,
            "ID": 1136,
            "ContestSlug": "biweekly-contest-5"
        },
        {
            "Rating": 1709.1461451873,
            "ID": 979,
            "ContestSlug": "weekly-contest-120"
        },
        {
            "Rating": 1709.1054732427,
            "ID": 2140,
            "ContestSlug": "weekly-contest-276"
        },
        {
            "Rating": 1708.9983361411,
            "ID": 1401,
            "ContestSlug": "biweekly-contest-23"
        },
        {
            "Rating": 1708.8735585776,
            "ID": 901,
            "ContestSlug": "weekly-contest-101"
        },
        {
            "Rating": 1708.812923679,
            "ID": 826,
            "ContestSlug": "weekly-contest-82"
        },
        {
            "Rating": 1708.7056764058,
            "ID": 2257,
            "ContestSlug": "biweekly-contest-77"
        },
        {
            "Rating": 1707.8992927609,
            "ID": 816,
            "ContestSlug": "weekly-contest-80"
        },
        {
            "Rating": 1704.360891641,
            "ID": 1947,
            "ContestSlug": "weekly-contest-251"
        },
        {
            "Rating": 1702.8035923458,
            "ID": 958,
            "ContestSlug": "weekly-contest-115"
        },
        {
            "Rating": 1702.4962514406,
            "ID": 2100,
            "ContestSlug": "biweekly-contest-67"
        },
        {
            "Rating": 1702.4387527636,
            "ID": 2080,
            "ContestSlug": "weekly-contest-268"
        },
        {
            "Rating": 1701.7584658834,
            "ID": 1774,
            "ContestSlug": "weekly-contest-230"
        },
        {
            "Rating": 1701.5735371897,
            "ID": 1054,
            "ContestSlug": "weekly-contest-138"
        },
        {
            "Rating": 1697.8500495479,
            "ID": 1017,
            "ContestSlug": "weekly-contest-130"
        },
        {
            "Rating": 1697.2356875149,
            "ID": 1289,
            "ContestSlug": "biweekly-contest-15"
        },
        {
            "Rating": 1697.0187705319,
            "ID": 825,
            "ContestSlug": "weekly-contest-82"
        },
        {
            "Rating": 1696.9920075471,
            "ID": 1487,
            "ContestSlug": "weekly-contest-194"
        },
        {
            "Rating": 1695.3076664977,
            "ID": 792,
            "ContestSlug": "weekly-contest-74"
        },
        {
            "Rating": 1695.2832486322,
            "ID": 1942,
            "ContestSlug": "biweekly-contest-57"
        },
        {
            "Rating": 1694.433951503,
            "ID": 829,
            "ContestSlug": "weekly-contest-83"
        },
        {
            "Rating": 1693.4495728383,
            "ID": 2337,
            "ContestSlug": "weekly-contest-301"
        },
        {
            "Rating": 1692.5884631801,
            "ID": 1462,
            "ContestSlug": "biweekly-contest-27"
        },
        {
            "Rating": 1690.9043557462,
            "ID": 919,
            "ContestSlug": "weekly-contest-105"
        },
        {
            "Rating": 1690.1655236843,
            "ID": 935,
            "ContestSlug": "weekly-contest-109"
        },
        {
            "Rating": 1689.7569144085,
            "ID": 1419,
            "ContestSlug": "weekly-contest-185"
        },
        {
            "Rating": 1688.9209684568,
            "ID": 1963,
            "ContestSlug": "weekly-contest-253"
        },
        {
            "Rating": 1686.4493679523,
            "ID": 950,
            "ContestSlug": "weekly-contest-113"
        },
        {
            "Rating": 1685.5389350949,
            "ID": 2233,
            "ContestSlug": "weekly-contest-288"
        },
        {
            "Rating": 1685.3599641299,
            "ID": 2074,
            "ContestSlug": "weekly-contest-267"
        },
        {
            "Rating": 1682.8882177724,
            "ID": 1443,
            "ContestSlug": "weekly-contest-188"
        },
        {
            "Rating": 1681.3263732456,
            "ID": 767,
            "ContestSlug": "weekly-contest-68"
        },
        {
            "Rating": 1680.866917849,
            "ID": 2280,
            "ContestSlug": "weekly-contest-294"
        },
        {
            "Rating": 1680.82425993,
            "ID": 1865,
            "ContestSlug": "weekly-contest-241"
        },
        {
            "Rating": 1680.4852623991,
            "ID": 1031,
            "ContestSlug": "weekly-contest-133"
        },
        {
            "Rating": 1680.1353258588,
            "ID": 2182,
            "ContestSlug": "weekly-contest-281"
        },
        {
            "Rating": 1679.2607152001,
            "ID": 1402,
            "ContestSlug": "biweekly-contest-23"
        },
        {
            "Rating": 1678.7231378948,
            "ID": 1905,
            "ContestSlug": "weekly-contest-246"
        },
        {
            "Rating": 1678.6241816708,
            "ID": 2317,
            "ContestSlug": "biweekly-contest-81"
        },
        {
            "Rating": 1678.5871762113,
            "ID": 2115,
            "ContestSlug": "biweekly-contest-68"
        },
        {
            "Rating": 1678.3947690537,
            "ID": 885,
            "ContestSlug": "weekly-contest-97"
        },
        {
            "Rating": 1678.1133886034,
            "ID": 853,
            "ContestSlug": "weekly-contest-89"
        },
        {
            "Rating": 1675.989407584,
            "ID": 974,
            "ContestSlug": "weekly-contest-119"
        },
        {
            "Rating": 1675.9610355975,
            "ID": 987,
            "ContestSlug": "weekly-contest-122"
        },
        {
            "Rating": 1675.761234741,
            "ID": 1870,
            "ContestSlug": "weekly-contest-242"
        },
        {
            "Rating": 1674.9985842835,
            "ID": 1339,
            "ContestSlug": "weekly-contest-174"
        },
        {
            "Rating": 1674.7986939472,
            "ID": 1922,
            "ContestSlug": "weekly-contest-248"
        },
        {
            "Rating": 1674.5365205597,
            "ID": 1215,
            "ContestSlug": "biweekly-contest-10"
        },
        {
            "Rating": 1672.1678031263,
            "ID": 1438,
            "ContestSlug": "weekly-contest-187"
        },
        {
            "Rating": 1671.9261598,
            "ID": 2033,
            "ContestSlug": "weekly-contest-262"
        },
        {
            "Rating": 1671.4657554194,
            "ID": 1738,
            "ContestSlug": "weekly-contest-225"
        },
        {
            "Rating": 1666.346990979,
            "ID": 1162,
            "ContestSlug": "weekly-contest-150"
        },
        {
            "Rating": 1665.24907247,
            "ID": 1620,
            "ContestSlug": "biweekly-contest-37"
        },
        {
            "Rating": 1664.7703749741,
            "ID": 1121,
            "ContestSlug": "biweekly-contest-4"
        },
        {
            "Rating": 1663.3912882908,
            "ID": 2063,
            "ContestSlug": "weekly-contest-266"
        },
        {
            "Rating": 1663.2612318917,
            "ID": 1219,
            "ContestSlug": "weekly-contest-157"
        },
        {
            "Rating": 1663.1853149056,
            "ID": 863,
            "ContestSlug": "weekly-contest-91"
        },
        {
            "Rating": 1662.6673692545,
            "ID": 2170,
            "ContestSlug": "weekly-contest-280"
        },
        {
            "Rating": 1658.921022733,
            "ID": 2195,
            "ContestSlug": "weekly-contest-283"
        },
        {
            "Rating": 1658.7495899767,
            "ID": 1254,
            "ContestSlug": "weekly-contest-162"
        },
        {
            "Rating": 1658.6836278802,
            "ID": 1169,
            "ContestSlug": "weekly-contest-151"
        },
        {
            "Rating": 1658.5967147757,
            "ID": 1958,
            "ContestSlug": "biweekly-contest-58"
        },
        {
            "Rating": 1658.3530344788,
            "ID": 2304,
            "ContestSlug": "weekly-contest-297"
        },
        {
            "Rating": 1658.3474650806,
            "ID": 1091,
            "ContestSlug": "weekly-contest-141"
        },
        {
            "Rating": 1658.3305547865,
            "ID": 1583,
            "ContestSlug": "weekly-contest-206"
        },
        {
            "Rating": 1657.1231739081,
            "ID": 1249,
            "ContestSlug": "weekly-contest-161"
        },
        {
            "Rating": 1656.5588918365,
            "ID": 2222,
            "ContestSlug": "biweekly-contest-75"
        },
        {
            "Rating": 1655.6433885989,
            "ID": 1004,
            "ContestSlug": "weekly-contest-126"
        },
        {
            "Rating": 1654.0793660142,
            "ID": 1257,
            "ContestSlug": "biweekly-contest-13"
        },
        {
            "Rating": 1653.7337081336,
            "ID": 1155,
            "ContestSlug": "weekly-contest-149"
        },
        {
            "Rating": 1653.0356626499,
            "ID": 1509,
            "ContestSlug": "biweekly-contest-30"
        },
        {
            "Rating": 1652.5809810428,
            "ID": 1311,
            "ContestSlug": "weekly-contest-170"
        },
        {
            "Rating": 1651.5845871727,
            "ID": 750,
            "ContestSlug": "weekly-contest-63"
        },
        {
            "Rating": 1651.569267834,
            "ID": 2343,
            "ContestSlug": "weekly-contest-302"
        },
        {
            "Rating": 1649.9728054796,
            "ID": 1367,
            "ContestSlug": "weekly-contest-178"
        },
        {
            "Rating": 1648.341757882,
            "ID": 870,
            "ContestSlug": "weekly-contest-93"
        },
        {
            "Rating": 1648.0880791614,
            "ID": 1975,
            "ContestSlug": "biweekly-contest-59"
        },
        {
            "Rating": 1646.1943237127,
            "ID": 1358,
            "ContestSlug": "biweekly-contest-20"
        },
        {
            "Rating": 1646.1765343383,
            "ID": 2226,
            "ContestSlug": "weekly-contest-287"
        },
        {
            "Rating": 1643.5283095007,
            "ID": 2196,
            "ContestSlug": "weekly-contest-283"
        },
        {
            "Rating": 1643.1325351423,
            "ID": 2024,
            "ContestSlug": "biweekly-contest-62"
        },
        {
            "Rating": 1642.1446933109,
            "ID": 2275,
            "ContestSlug": "weekly-contest-293"
        },
        {
            "Rating": 1641.9424376927,
            "ID": 2375,
            "ContestSlug": "weekly-contest-306"
        },
        {
            "Rating": 1640.9591585343,
            "ID": 2187,
            "ContestSlug": "weekly-contest-282"
        },
        {
            "Rating": 1640.8976042503,
            "ID": 2344,
            "ContestSlug": "weekly-contest-302"
        },
        {
            "Rating": 1638.3134093066,
            "ID": 1926,
            "ContestSlug": "biweekly-contest-56"
        },
        {
            "Rating": 1638.1281256708,
            "ID": 838,
            "ContestSlug": "weekly-contest-85"
        },
        {
            "Rating": 1638.0148920643,
            "ID": 990,
            "ContestSlug": "weekly-contest-123"
        },
        {
            "Rating": 1637.0082208814,
            "ID": 1558,
            "ContestSlug": "biweekly-contest-33"
        },
        {
            "Rating": 1636.6877598712,
            "ID": 1386,
            "ContestSlug": "biweekly-contest-22"
        },
        {
            "Rating": 1636.47322627,
            "ID": 2384,
            "ContestSlug": "weekly-contest-307"
        },
        {
            "Rating": 1635.6879273926,
            "ID": 1899,
            "ContestSlug": "weekly-contest-245"
        },
        {
            "Rating": 1633.6202302555,
            "ID": 1466,
            "ContestSlug": "weekly-contest-191"
        },
        {
            "Rating": 1633.1789521619,
            "ID": 1053,
            "ContestSlug": "weekly-contest-138"
        },
        {
            "Rating": 1633.1372577433,
            "ID": 1319,
            "ContestSlug": "weekly-contest-171"
        },
        {
            "Rating": 1632.0191837349,
            "ID": 820,
            "ContestSlug": "weekly-contest-81"
        },
        {
            "Rating": 1631.338145683,
            "ID": 1540,
            "ContestSlug": "biweekly-contest-32"
        },
        {
            "Rating": 1629.5416832545,
            "ID": 1680,
            "ContestSlug": "weekly-contest-218"
        },
        {
            "Rating": 1628.5072578803,
            "ID": 1332,
            "ContestSlug": "weekly-contest-173"
        },
        {
            "Rating": 1626.6740430119,
            "ID": 1182,
            "ContestSlug": "biweekly-contest-8"
        },
        {
            "Rating": 1626.3266982141,
            "ID": 1366,
            "ContestSlug": "weekly-contest-178"
        },
        {
            "Rating": 1624.9775945043,
            "ID": 785,
            "ContestSlug": "weekly-contest-72"
        },
        {
            "Rating": 1624.4737611923,
            "ID": 916,
            "ContestSlug": "weekly-contest-104"
        },
        {
            "Rating": 1623.9443250479,
            "ID": 1248,
            "ContestSlug": "weekly-contest-161"
        },
        {
            "Rating": 1622.8414025136,
            "ID": 2086,
            "ContestSlug": "biweekly-contest-66"
        },
        {
            "Rating": 1622.7743864401,
            "ID": 2365,
            "ContestSlug": "biweekly-contest-84"
        },
        {
            "Rating": 1622.2389577197,
            "ID": 2364,
            "ContestSlug": "biweekly-contest-84"
        },
        {
            "Rating": 1618.6016480451,
            "ID": 1503,
            "ContestSlug": "weekly-contest-196"
        },
        {
            "Rating": 1616.2067360638,
            "ID": 2241,
            "ContestSlug": "biweekly-contest-76"
        },
        {
            "Rating": 1615.4767730477,
            "ID": 1020,
            "ContestSlug": "weekly-contest-130"
        },
        {
            "Rating": 1614.4877804672,
            "ID": 2145,
            "ContestSlug": "biweekly-contest-70"
        },
        {
            "Rating": 1613.0429766636,
            "ID": 1277,
            "ContestSlug": "weekly-contest-165"
        },
        {
            "Rating": 1611.8434720083,
            "ID": 2232,
            "ContestSlug": "weekly-contest-288"
        },
        {
            "Rating": 1611.7621820686,
            "ID": 789,
            "ContestSlug": "weekly-contest-73"
        },
        {
            "Rating": 1610.569398159,
            "ID": 1524,
            "ContestSlug": "biweekly-contest-31"
        },
        {
            "Rating": 1610.1866391145,
            "ID": 1670,
            "ContestSlug": "biweekly-contest-40"
        },
        {
            "Rating": 1607.80608595,
            "ID": 962,
            "ContestSlug": "weekly-contest-116"
        },
        {
            "Rating": 1607.7036437819,
            "ID": 2320,
            "ContestSlug": "weekly-contest-299"
        },
        {
            "Rating": 1607.0005715974,
            "ID": 1123,
            "ContestSlug": "weekly-contest-145"
        },
        {
            "Rating": 1606.9895296459,
            "ID": 1300,
            "ContestSlug": "biweekly-contest-16"
        },
        {
            "Rating": 1606.2185826486,
            "ID": 1604,
            "ContestSlug": "biweekly-contest-36"
        },
        {
            "Rating": 1604.9737380545,
            "ID": 809,
            "ContestSlug": "weekly-contest-78"
        },
        {
            "Rating": 1604.0695445163,
            "ID": 2316,
            "ContestSlug": "biweekly-contest-81"
        },
        {
            "Rating": 1602.7242171967,
            "ID": 2249,
            "ContestSlug": "weekly-contest-290"
        },
        {
            "Rating": 1601.511760532,
            "ID": 926,
            "ContestSlug": "weekly-contest-107"
        },
        {
            "Rating": 1600.5573262373,
            "ID": 1864,
            "ContestSlug": "weekly-contest-241"
        },
        {
            "Rating": 1599.2720584736,
            "ID": 1048,
            "ContestSlug": "weekly-contest-137"
        },
        {
            "Rating": 1597.1931473887,
            "ID": 1218,
            "ContestSlug": "weekly-contest-157"
        },
        {
            "Rating": 1597.0215918551,
            "ID": 1247,
            "ContestSlug": "weekly-contest-161"
        },
        {
            "Rating": 1594.2563236049,
            "ID": 822,
            "ContestSlug": "weekly-contest-81"
        },
        {
            "Rating": 1593.8926580448,
            "ID": 1577,
            "ContestSlug": "weekly-contest-205"
        },
        {
            "Rating": 1591.5492530876,
            "ID": 930,
            "ContestSlug": "weekly-contest-108"
        },
        {
            "Rating": 1591.4725328821,
            "ID": 1286,
            "ContestSlug": "biweekly-contest-15"
        },
        {
            "Rating": 1590.5791055102,
            "ID": 969,
            "ContestSlug": "weekly-contest-118"
        },
        {
            "Rating": 1590.547713663,
            "ID": 1573,
            "ContestSlug": "biweekly-contest-34"
        },
        {
            "Rating": 1590.269030833,
            "ID": 1664,
            "ContestSlug": "weekly-contest-216"
        },
        {
            "Rating": 1590.0883962313,
            "ID": 893,
            "ContestSlug": "weekly-contest-99"
        },
        {
            "Rating": 1590.0463215721,
            "ID": 877,
            "ContestSlug": "weekly-contest-95"
        },
        {
            "Rating": 1588.9690763997,
            "ID": 1813,
            "ContestSlug": "biweekly-contest-49"
        },
        {
            "Rating": 1588.3835994255,
            "ID": 1764,
            "ContestSlug": "biweekly-contest-46"
        },
        {
            "Rating": 1585.5793143983,
            "ID": 1030,
            "ContestSlug": "weekly-contest-133"
        },
        {
            "Rating": 1581.4963716166,
            "ID": 2211,
            "ContestSlug": "weekly-contest-285"
        },
        {
            "Rating": 1580.3620959714,
            "ID": 1839,
            "ContestSlug": "weekly-contest-238"
        },
        {
            "Rating": 1579.2309881035,
            "ID": 1743,
            "ContestSlug": "weekly-contest-226"
        },
        {
            "Rating": 1578.8503818621,
            "ID": 1034,
            "ContestSlug": "weekly-contest-134"
        },
        {
            "Rating": 1577.1141767118,
            "ID": 2288,
            "ContestSlug": "weekly-contest-295"
        },
        {
            "Rating": 1575.6324598387,
            "ID": 1415,
            "ContestSlug": "biweekly-contest-24"
        },
        {
            "Rating": 1574.7542247682,
            "ID": 981,
            "ContestSlug": "weekly-contest-121"
        },
        {
            "Rating": 1574.0392121288,
            "ID": 1578,
            "ContestSlug": "weekly-contest-205"
        },
        {
            "Rating": 1573.824807946,
            "ID": 1423,
            "ContestSlug": "weekly-contest-186"
        },
        {
            "Rating": 1573.4042963622,
            "ID": 1268,
            "ContestSlug": "weekly-contest-164"
        },
        {
            "Rating": 1573.2701790739,
            "ID": 931,
            "ContestSlug": "weekly-contest-108"
        },
        {
            "Rating": 1571.1721048101,
            "ID": 779,
            "ContestSlug": "weekly-contest-70"
        },
        {
            "Rating": 1570.8347522104,
            "ID": 1019,
            "ContestSlug": "weekly-contest-130"
        },
        {
            "Rating": 1569.7528744586,
            "ID": 1109,
            "ContestSlug": "weekly-contest-144"
        },
        {
            "Rating": 1567.6884942977,
            "ID": 2044,
            "ContestSlug": "weekly-contest-263"
        },
        {
            "Rating": 1566.2526716951,
            "ID": 769,
            "ContestSlug": "weekly-contest-68"
        },
        {
            "Rating": 1565.2483424929,
            "ID": 846,
            "ContestSlug": "weekly-contest-87"
        },
        {
            "Rating": 1563.9451046163,
            "ID": 800,
            "ContestSlug": "weekly-contest-76"
        },
        {
            "Rating": 1562.9802666517,
            "ID": 1008,
            "ContestSlug": "weekly-contest-127"
        },
        {
            "Rating": 1562.9186033202,
            "ID": 1452,
            "ContestSlug": "weekly-contest-189"
        },
        {
            "Rating": 1562.7212466716,
            "ID": 856,
            "ContestSlug": "weekly-contest-90"
        },
        {
            "Rating": 1562.0956544608,
            "ID": 2409,
            "ContestSlug": "biweekly-contest-87"
        },
        {
            "Rating": 1561.2655635205,
            "ID": 1256,
            "ContestSlug": "biweekly-contest-13"
        },
        {
            "Rating": 1561.0553908973,
            "ID": 1376,
            "ContestSlug": "weekly-contest-179"
        },
        {
            "Rating": 1558.9522968448,
            "ID": 2310,
            "ContestSlug": "weekly-contest-298"
        },
        {
            "Rating": 1558.7188539503,
            "ID": 1144,
            "ContestSlug": "weekly-contest-148"
        },
        {
            "Rating": 1558.6880035344,
            "ID": 1181,
            "ContestSlug": "biweekly-contest-8"
        },
        {
            "Rating": 1558.4971807039,
            "ID": 1101,
            "ContestSlug": "biweekly-contest-3"
        },
        {
            "Rating": 1558.1421869292,
            "ID": 1243,
            "ContestSlug": "biweekly-contest-12"
        },
        {
            "Rating": 1557.017055582,
            "ID": 2007,
            "ContestSlug": "biweekly-contest-61"
        },
        {
            "Rating": 1556.8824239708,
            "ID": 2131,
            "ContestSlug": "biweekly-contest-69"
        },
        {
            "Rating": 1550.4297615307,
            "ID": 2207,
            "ContestSlug": "biweekly-contest-74"
        },
        {
            "Rating": 1550.0978082682,
            "ID": 2208,
            "ContestSlug": "biweekly-contest-74"
        },
        {
            "Rating": 1548.4678056182,
            "ID": 1329,
            "ContestSlug": "biweekly-contest-18"
        },
        {
            "Rating": 1548.0854419238,
            "ID": 1599,
            "ContestSlug": "weekly-contest-208"
        },
        {
            "Rating": 1547.5714796512,
            "ID": 954,
            "ContestSlug": "weekly-contest-114"
        },
        {
            "Rating": 1547.0385279086,
            "ID": 758,
            "ContestSlug": "weekly-contest-66"
        },
        {
            "Rating": 1544.8391626032,
            "ID": 1104,
            "ContestSlug": "weekly-contest-143"
        },
        {
            "Rating": 1544.8261365027,
            "ID": 1233,
            "ContestSlug": "weekly-contest-159"
        },
        {
            "Rating": 1544.6371526659,
            "ID": 794,
            "ContestSlug": "weekly-contest-74"
        },
        {
            "Rating": 1542.5630367445,
            "ID": 812,
            "ContestSlug": "weekly-contest-79"
        },
        {
            "Rating": 1541.7840320661,
            "ID": 1283,
            "ContestSlug": "weekly-contest-166"
        },
        {
            "Rating": 1541.6944600975,
            "ID": 986,
            "ContestSlug": "weekly-contest-122"
        },
        {
            "Rating": 1541.6176288991,
            "ID": 1749,
            "ContestSlug": "biweekly-contest-45"
        },
        {
            "Rating": 1541.5405749918,
            "ID": 1209,
            "ContestSlug": "weekly-contest-156"
        },
        {
            "Rating": 1541.348438509,
            "ID": 1007,
            "ContestSlug": "weekly-contest-127"
        },
        {
            "Rating": 1541.2260256298,
            "ID": 1229,
            "ContestSlug": "biweekly-contest-11"
        },
        {
            "Rating": 1540.5750839091,
            "ID": 1382,
            "ContestSlug": "weekly-contest-180"
        },
        {
            "Rating": 1540.2351411176,
            "ID": 2349,
            "ContestSlug": "biweekly-contest-83"
        },
        {
            "Rating": 1539.2250193318,
            "ID": 1992,
            "ContestSlug": "biweekly-contest-60"
        },
        {
            "Rating": 1538.233149704,
            "ID": 2178,
            "ContestSlug": "biweekly-contest-72"
        },
        {
            "Rating": 1537.1387686755,
            "ID": 1023,
            "ContestSlug": "weekly-contest-131"
        },
        {
            "Rating": 1536.7018543075,
            "ID": 1861,
            "ContestSlug": "biweekly-contest-52"
        },
        {
            "Rating": 1534.325005151,
            "ID": 865,
            "ContestSlug": "weekly-contest-92"
        },
        {
            "Rating": 1534.0648719302,
            "ID": 1797,
            "ContestSlug": "biweekly-contest-48"
        },
        {
            "Rating": 1533.9285875234,
            "ID": 1362,
            "ContestSlug": "weekly-contest-177"
        },
        {
            "Rating": 1533.3376144199,
            "ID": 1930,
            "ContestSlug": "weekly-contest-249"
        },
        {
            "Rating": 1532.2539947529,
            "ID": 900,
            "ContestSlug": "weekly-contest-101"
        },
        {
            "Rating": 1530.495439788,
            "ID": 1400,
            "ContestSlug": "biweekly-contest-23"
        },
        {
            "Rating": 1530.4652027753,
            "ID": 1657,
            "ContestSlug": "weekly-contest-215"
        },
        {
            "Rating": 1530.0343519239,
            "ID": 1726,
            "ContestSlug": "weekly-contest-224"
        },
        {
            "Rating": 1529.7617243868,
            "ID": 881,
            "ContestSlug": "weekly-contest-96"
        },
        {
            "Rating": 1528.7183829005,
            "ID": 1695,
            "ContestSlug": "weekly-contest-220"
        },
        {
            "Rating": 1527.6868660176,
            "ID": 1921,
            "ContestSlug": "weekly-contest-248"
        },
        {
            "Rating": 1525.2146106195,
            "ID": 2201,
            "ContestSlug": "weekly-contest-284"
        },
        {
            "Rating": 1524.8218282113,
            "ID": 1272,
            "ContestSlug": "biweekly-contest-14"
        },
        {
            "Rating": 1524.5693481538,
            "ID": 1442,
            "ContestSlug": "weekly-contest-188"
        },
        {
            "Rating": 1524.3227469,
            "ID": 1640,
            "ContestSlug": "weekly-contest-213"
        },
        {
            "Rating": 1523.4113866454,
            "ID": 1829,
            "ContestSlug": "biweekly-contest-50"
        },
        {
            "Rating": 1521.9977490324,
            "ID": 1615,
            "ContestSlug": "weekly-contest-210"
        },
        {
            "Rating": 1521.7133617698,
            "ID": 1763,
            "ContestSlug": "biweekly-contest-46"
        },
        {
            "Rating": 1521.1768537583,
            "ID": 1041,
            "ContestSlug": "weekly-contest-136"
        },
        {
            "Rating": 1519.1715594347,
            "ID": 1641,
            "ContestSlug": "weekly-contest-213"
        },
        {
            "Rating": 1516.8229485853,
            "ID": 775,
            "ContestSlug": "weekly-contest-69"
        },
        {
            "Rating": 1516.4104902196,
            "ID": 904,
            "ContestSlug": "weekly-contest-102"
        },
        {
            "Rating": 1514.8181710611,
            "ID": 1855,
            "ContestSlug": "weekly-contest-240"
        },
        {
            "Rating": 1512.3323577063,
            "ID": 1557,
            "ContestSlug": "biweekly-contest-33"
        },
        {
            "Rating": 1511.3725353467,
            "ID": 1110,
            "ContestSlug": "weekly-contest-144"
        },
        {
            "Rating": 1509.5562928491,
            "ID": 2216,
            "ContestSlug": "weekly-contest-286"
        },
        {
            "Rating": 1509.5432131875,
            "ID": 1647,
            "ContestSlug": "weekly-contest-214"
        },
        {
            "Rating": 1508.1169489285,
            "ID": 1151,
            "ContestSlug": "biweekly-contest-6"
        },
        {
            "Rating": 1508.099765827,
            "ID": 1496,
            "ContestSlug": "weekly-contest-195"
        },
        {
            "Rating": 1507.8701119064,
            "ID": 892,
            "ContestSlug": "weekly-contest-99"
        },
        {
            "Rating": 1507.1617507911,
            "ID": 2105,
            "ContestSlug": "weekly-contest-271"
        },
        {
            "Rating": 1506.8958220609,
            "ID": 1387,
            "ContestSlug": "biweekly-contest-22"
        },
        {
            "Rating": 1505.8669082864,
            "ID": 1253,
            "ContestSlug": "weekly-contest-162"
        },
        {
            "Rating": 1505.82499953,
            "ID": 1780,
            "ContestSlug": "biweekly-contest-47"
        },
        {
            "Rating": 1504.8237159326,
            "ID": 869,
            "ContestSlug": "weekly-contest-93"
        },
        {
            "Rating": 1504.2133321504,
            "ID": 2104,
            "ContestSlug": "weekly-contest-271"
        },
        {
            "Rating": 1504.0178888667,
            "ID": 1461,
            "ContestSlug": "biweekly-contest-27"
        },
        {
            "Rating": 1502.5363677723,
            "ID": 2358,
            "ContestSlug": "weekly-contest-304"
        },
        {
            "Rating": 1501.6846714598,
            "ID": 1750,
            "ContestSlug": "biweekly-contest-45"
        },
        {
            "Rating": 1501.1152614679,
            "ID": 1090,
            "ContestSlug": "weekly-contest-141"
        },
        {
            "Rating": 1500.8381829812,
            "ID": 915,
            "ContestSlug": "weekly-contest-104"
        },
        {
            "Rating": 1499.7136257352,
            "ID": 1525,
            "ContestSlug": "biweekly-contest-31"
        },
        {
            "Rating": 1499.3290269267,
            "ID": 1968,
            "ContestSlug": "weekly-contest-254"
        },
        {
            "Rating": 1498.1542511841,
            "ID": 1904,
            "ContestSlug": "weekly-contest-246"
        },
        {
            "Rating": 1497.8880991093,
            "ID": 998,
            "ContestSlug": "weekly-contest-125"
        },
        {
            "Rating": 1496.9128643588,
            "ID": 1208,
            "ContestSlug": "weekly-contest-156"
        },
        {
            "Rating": 1496.2502937005,
            "ID": 2285,
            "ContestSlug": "biweekly-contest-79"
        },
        {
            "Rating": 1496.1462748679,
            "ID": 2191,
            "ContestSlug": "biweekly-contest-73"
        },
        {
            "Rating": 1495.715740828,
            "ID": 1685,
            "ContestSlug": "biweekly-contest-41"
        },
        {
            "Rating": 1495.3186477678,
            "ID": 949,
            "ContestSlug": "weekly-contest-113"
        },
        {
            "Rating": 1491.4638194905,
            "ID": 1806,
            "ContestSlug": "weekly-contest-234"
        },
        {
            "Rating": 1490.8990184504,
            "ID": 1759,
            "ContestSlug": "weekly-contest-228"
        },
        {
            "Rating": 1490.2370387981,
            "ID": 1296,
            "ContestSlug": "weekly-contest-168"
        },
        {
            "Rating": 1489.0102202162,
            "ID": 1175,
            "ContestSlug": "weekly-contest-152"
        },
        {
            "Rating": 1487.5826663483,
            "ID": 1753,
            "ContestSlug": "weekly-contest-227"
        },
        {
            "Rating": 1486.764933431,
            "ID": 1637,
            "ContestSlug": "biweekly-contest-38"
        },
        {
            "Rating": 1486.4687014051,
            "ID": 1566,
            "ContestSlug": "weekly-contest-204"
        },
        {
            "Rating": 1485.6550472186,
            "ID": 1190,
            "ContestSlug": "weekly-contest-154"
        },
        {
            "Rating": 1485.135401269,
            "ID": 1418,
            "ContestSlug": "weekly-contest-185"
        },
        {
            "Rating": 1483.8137189709,
            "ID": 1314,
            "ContestSlug": "biweekly-contest-17"
        },
        {
            "Rating": 1481.960807786,
            "ID": 1807,
            "ContestSlug": "weekly-contest-234"
        },
        {
            "Rating": 1481.5701319876,
            "ID": 1167,
            "ContestSlug": "biweekly-contest-7"
        },
        {
            "Rating": 1481.1046340847,
            "ID": 2380,
            "ContestSlug": "biweekly-contest-85"
        },
        {
            "Rating": 1480.1116248664,
            "ID": 1087,
            "ContestSlug": "biweekly-contest-2"
        },
        {
            "Rating": 1479.4837595809,
            "ID": 1545,
            "ContestSlug": "weekly-contest-201"
        },
        {
            "Rating": 1479.0110934646,
            "ID": 1166,
            "ContestSlug": "biweekly-contest-7"
        },
        {
            "Rating": 1478.3848028264,
            "ID": 1390,
            "ContestSlug": "weekly-contest-181"
        },
        {
            "Rating": 1477.4844514104,
            "ID": 951,
            "ContestSlug": "weekly-contest-113"
        },
        {
            "Rating": 1476.9118898539,
            "ID": 2368,
            "ContestSlug": "weekly-contest-305"
        },
        {
            "Rating": 1476.9062320302,
            "ID": 2300,
            "ContestSlug": "biweekly-contest-80"
        },
        {
            "Rating": 1474.0150725665,
            "ID": 984,
            "ContestSlug": "weekly-contest-121"
        },
        {
            "Rating": 1473.864993045,
            "ID": 1328,
            "ContestSlug": "biweekly-contest-18"
        },
        {
            "Rating": 1473.7057465272,
            "ID": 1352,
            "ContestSlug": "weekly-contest-176"
        },
        {
            "Rating": 1473.2523136772,
            "ID": 897,
            "ContestSlug": "weekly-contest-100"
        },
        {
            "Rating": 1472.7864965062,
            "ID": 2265,
            "ContestSlug": "weekly-contest-292"
        },
        {
            "Rating": 1471.8964024887,
            "ID": 2047,
            "ContestSlug": "weekly-contest-264"
        },
        {
            "Rating": 1471.6221713607,
            "ID": 1093,
            "ContestSlug": "weekly-contest-142"
        },
        {
            "Rating": 1467.9366439696,
            "ID": 2012,
            "ContestSlug": "weekly-contest-259"
        },
        {
            "Rating": 1467.7383709213,
            "ID": 2038,
            "ContestSlug": "biweekly-contest-63"
        },
        {
            "Rating": 1465.7023558248,
            "ID": 1414,
            "ContestSlug": "biweekly-contest-24"
        },
        {
            "Rating": 1464.6895034875,
            "ID": 1361,
            "ContestSlug": "weekly-contest-177"
        },
        {
            "Rating": 1464.5254961488,
            "ID": 1396,
            "ContestSlug": "weekly-contest-182"
        },
        {
            "Rating": 1462.4423844498,
            "ID": 1022,
            "ContestSlug": "weekly-contest-131"
        },
        {
            "Rating": 1461.9157715206,
            "ID": 946,
            "ContestSlug": "weekly-contest-112"
        },
        {
            "Rating": 1461.2892510067,
            "ID": 1909,
            "ContestSlug": "biweekly-contest-55"
        },
        {
            "Rating": 1460.9610936441,
            "ID": 833,
            "ContestSlug": "weekly-contest-84"
        },
        {
            "Rating": 1460.9105672071,
            "ID": 1910,
            "ContestSlug": "biweekly-contest-55"
        },
        {
            "Rating": 1460.5903088359,
            "ID": 1663,
            "ContestSlug": "weekly-contest-216"
        },
        {
            "Rating": 1459.8208951847,
            "ID": 1310,
            "ContestSlug": "weekly-contest-170"
        },
        {
            "Rating": 1458.356493039,
            "ID": 2062,
            "ContestSlug": "weekly-contest-266"
        },
        {
            "Rating": 1455.8516200241,
            "ID": 2391,
            "ContestSlug": "weekly-contest-308"
        },
        {
            "Rating": 1454.7459647138,
            "ID": 2094,
            "ContestSlug": "weekly-contest-270"
        },
        {
            "Rating": 1454.3901912166,
            "ID": 1846,
            "ContestSlug": "biweekly-contest-51"
        },
        {
            "Rating": 1453.7818053022,
            "ID": 1472,
            "ContestSlug": "weekly-contest-192"
        },
        {
            "Rating": 1453.1833769825,
            "ID": 781,
            "ContestSlug": "weekly-contest-71"
        },
        {
            "Rating": 1450.5787293419,
            "ID": 831,
            "ContestSlug": "weekly-contest-83"
        },
        {
            "Rating": 1448.1207963663,
            "ID": 945,
            "ContestSlug": "weekly-contest-112"
        },
        {
            "Rating": 1447.0268321102,
            "ID": 2099,
            "ContestSlug": "biweekly-contest-67"
        },
        {
            "Rating": 1446.4280778775,
            "ID": 1026,
            "ContestSlug": "weekly-contest-132"
        },
        {
            "Rating": 1445.3734269673,
            "ID": 1946,
            "ContestSlug": "weekly-contest-251"
        },
        {
            "Rating": 1445.1422945604,
            "ID": 2295,
            "ContestSlug": "weekly-contest-296"
        },
        {
            "Rating": 1444.6795731919,
            "ID": 2028,
            "ContestSlug": "weekly-contest-261"
        },
        {
            "Rating": 1444.6098846511,
            "ID": 1465,
            "ContestSlug": "weekly-contest-191"
        },
        {
            "Rating": 1444.2068009303,
            "ID": 942,
            "ContestSlug": "weekly-contest-111"
        },
        {
            "Rating": 1443.2353621969,
            "ID": 1560,
            "ContestSlug": "weekly-contest-203"
        },
        {
            "Rating": 1443.0697629277,
            "ID": 763,
            "ContestSlug": "weekly-contest-67"
        },
        {
            "Rating": 1442.9468304752,
            "ID": 836,
            "ContestSlug": "weekly-contest-85"
        },
        {
            "Rating": 1441.4290319373,
            "ID": 1094,
            "ContestSlug": "weekly-contest-142"
        },
        {
            "Rating": 1439.5656079032,
            "ID": 1261,
            "ContestSlug": "weekly-contest-163"
        },
        {
            "Rating": 1438.8988489545,
            "ID": 1375,
            "ContestSlug": "weekly-contest-179"
        },
        {
            "Rating": 1438.223135905,
            "ID": 1609,
            "ContestSlug": "weekly-contest-209"
        },
        {
            "Rating": 1436.5343999134,
            "ID": 845,
            "ContestSlug": "weekly-contest-87"
        },
        {
            "Rating": 1436.3892315914,
            "ID": 1701,
            "ContestSlug": "biweekly-contest-42"
        },
        {
            "Rating": 1436.1125054038,
            "ID": 1433,
            "ContestSlug": "biweekly-contest-25"
        },
        {
            "Rating": 1435.9559888935,
            "ID": 2001,
            "ContestSlug": "weekly-contest-258"
        },
        {
            "Rating": 1435.3564963722,
            "ID": 1025,
            "ContestSlug": "weekly-contest-132"
        },
        {
            "Rating": 1433.0795554833,
            "ID": 1535,
            "ContestSlug": "weekly-contest-200"
        },
        {
            "Rating": 1432.9593207076,
            "ID": 967,
            "ContestSlug": "weekly-contest-117"
        },
        {
            "Rating": 1432.9051050881,
            "ID": 994,
            "ContestSlug": "weekly-contest-124"
        },
        {
            "Rating": 1432.0967926378,
            "ID": 1785,
            "ContestSlug": "weekly-contest-231"
        },
        {
            "Rating": 1431.6864980883,
            "ID": 1170,
            "ContestSlug": "weekly-contest-151"
        },
        {
            "Rating": 1431.0523656241,
            "ID": 2415,
            "ContestSlug": "weekly-contest-311"
        },
        {
            "Rating": 1430.3429533629,
            "ID": 1636,
            "ContestSlug": "biweekly-contest-38"
        },
        {
            "Rating": 1429.6349292399,
            "ID": 1357,
            "ContestSlug": "biweekly-contest-20"
        },
        {
            "Rating": 1429.1878389249,
            "ID": 988,
            "ContestSlug": "weekly-contest-122"
        },
        {
            "Rating": 1428.712905903,
            "ID": 817,
            "ContestSlug": "weekly-contest-80"
        },
        {
            "Rating": 1428.6729861424,
            "ID": 1845,
            "ContestSlug": "biweekly-contest-51"
        },
        {
            "Rating": 1428.1443796872,
            "ID": 1669,
            "ContestSlug": "biweekly-contest-40"
        },
        {
            "Rating": 1427.7906804882,
            "ID": 1887,
            "ContestSlug": "weekly-contest-244"
        },
        {
            "Rating": 1426.948379305,
            "ID": 1315,
            "ContestSlug": "biweekly-contest-17"
        },
        {
            "Rating": 1426.7384112327,
            "ID": 1432,
            "ContestSlug": "biweekly-contest-25"
        },
        {
            "Rating": 1426.7144554733,
            "ID": 1003,
            "ContestSlug": "weekly-contest-126"
        },
        {
            "Rating": 1425.9672522649,
            "ID": 840,
            "ContestSlug": "weekly-contest-86"
        },
        {
            "Rating": 1425.3981616639,
            "ID": 883,
            "ContestSlug": "weekly-contest-96"
        },
        {
            "Rating": 1423.5501543781,
            "ID": 791,
            "ContestSlug": "weekly-contest-73"
        },
        {
            "Rating": 1423.1058649921,
            "ID": 1333,
            "ContestSlug": "weekly-contest-173"
        },
        {
            "Rating": 1423.0355763093,
            "ID": 1493,
            "ContestSlug": "biweekly-contest-29"
        },
        {
            "Rating": 1421.9944676861,
            "ID": 1630,
            "ContestSlug": "weekly-contest-212"
        },
        {
            "Rating": 1421.7251191403,
            "ID": 2326,
            "ContestSlug": "weekly-contest-300"
        },
        {
            "Rating": 1421.6541140049,
            "ID": 1360,
            "ContestSlug": "weekly-contest-177"
        },
        {
            "Rating": 1421.2624065513,
            "ID": 1033,
            "ContestSlug": "weekly-contest-134"
        },
        {
            "Rating": 1418.9758090724,
            "ID": 2374,
            "ContestSlug": "weekly-contest-306"
        },
        {
            "Rating": 1418.8205349928,
            "ID": 1656,
            "ContestSlug": "weekly-contest-215"
        },
        {
            "Rating": 1418.6847740057,
            "ID": 1962,
            "ContestSlug": "weekly-contest-253"
        },
        {
            "Rating": 1418.1401949854,
            "ID": 1052,
            "ContestSlug": "weekly-contest-138"
        },
        {
            "Rating": 1417.3934930077,
            "ID": 2139,
            "ContestSlug": "weekly-contest-276"
        },
        {
            "Rating": 1416.8961009909,
            "ID": 1652,
            "ContestSlug": "biweekly-contest-39"
        },
        {
            "Rating": 1416.4124723866,
            "ID": 2294,
            "ContestSlug": "weekly-contest-296"
        },
        {
            "Rating": 1414.4918812526,
            "ID": 890,
            "ContestSlug": "weekly-contest-98"
        },
        {
            "Rating": 1414.4351202231,
            "ID": 1985,
            "ContestSlug": "weekly-contest-256"
        },
        {
            "Rating": 1413.4238697034,
            "ID": 2383,
            "ContestSlug": "weekly-contest-307"
        },
        {
            "Rating": 1412.3053230205,
            "ID": 1823,
            "ContestSlug": "weekly-contest-236"
        },
        {
            "Rating": 1412.2790156634,
            "ID": 841,
            "ContestSlug": "weekly-contest-86"
        },
        {
            "Rating": 1410.5239927267,
            "ID": 1138,
            "ContestSlug": "weekly-contest-147"
        },
        {
            "Rating": 1408.7923640745,
            "ID": 1588,
            "ContestSlug": "biweekly-contest-35"
        },
        {
            "Rating": 1408.427592417,
            "ID": 2110,
            "ContestSlug": "weekly-contest-272"
        },
        {
            "Rating": 1407.9870845299,
            "ID": 1006,
            "ContestSlug": "weekly-contest-127"
        },
        {
            "Rating": 1407.5442381391,
            "ID": 1217,
            "ContestSlug": "weekly-contest-157"
        },
        {
            "Rating": 1407.1322366299,
            "ID": 1325,
            "ContestSlug": "weekly-contest-172"
        },
        {
            "Rating": 1407.0629410799,
            "ID": 1886,
            "ContestSlug": "weekly-contest-244"
        },
        {
            "Rating": 1405.5786892723,
            "ID": 1561,
            "ContestSlug": "weekly-contest-203"
        },
        {
            "Rating": 1405.4005354401,
            "ID": 1410,
            "ContestSlug": "weekly-contest-184"
        },
        {
            "Rating": 1405.0021415178,
            "ID": 1457,
            "ContestSlug": "weekly-contest-190"
        },
        {
            "Rating": 1404.7016862187,
            "ID": 1237,
            "ContestSlug": "weekly-contest-160"
        },
        {
            "Rating": 1404.1839222,
            "ID": 1700,
            "ContestSlug": "biweekly-contest-42"
        },
        {
            "Rating": 1402.0863615706,
            "ID": 1508,
            "ContestSlug": "biweekly-contest-30"
        },
        {
            "Rating": 1401.2246983038,
            "ID": 1198,
            "ContestSlug": "biweekly-contest-9"
        },
        {
            "Rating": 1399.8468905274,
            "ID": 2240,
            "ContestSlug": "biweekly-contest-76"
        },
        {
            "Rating": 1397.8875115008,
            "ID": 1071,
            "ContestSlug": "weekly-contest-139"
        },
        {
            "Rating": 1397.7743198793,
            "ID": 1176,
            "ContestSlug": "weekly-contest-152"
        },
        {
            "Rating": 1396.8422030812,
            "ID": 788,
            "ContestSlug": "weekly-contest-73"
        },
        {
            "Rating": 1396.5990609759,
            "ID": 1404,
            "ContestSlug": "weekly-contest-183"
        },
        {
            "Rating": 1396.5448074496,
            "ID": 1306,
            "ContestSlug": "weekly-contest-169"
        },
        {
            "Rating": 1396.4853538164,
            "ID": 944,
            "ContestSlug": "weekly-contest-111"
        },
        {
            "Rating": 1395.5132479177,
            "ID": 1668,
            "ContestSlug": "biweekly-contest-40"
        },
        {
            "Rating": 1394.9149882274,
            "ID": 2256,
            "ContestSlug": "biweekly-contest-77"
        },
        {
            "Rating": 1393.4123491817,
            "ID": 978,
            "ContestSlug": "weekly-contest-120"
        },
        {
            "Rating": 1392.6601629182,
            "ID": 1529,
            "ContestSlug": "weekly-contest-199"
        },
        {
            "Rating": 1392.0853311911,
            "ID": 957,
            "ContestSlug": "weekly-contest-115"
        },
        {
            "Rating": 1391.7243180131,
            "ID": 1222,
            "ContestSlug": "weekly-contest-158"
        },
        {
            "Rating": 1390.5023027273,
            "ID": 2155,
            "ContestSlug": "weekly-contest-278"
        },
        {
            "Rating": 1389.331169471,
            "ID": 1065,
            "ContestSlug": "biweekly-contest-1"
        },
        {
            "Rating": 1389.0328392117,
            "ID": 1214,
            "ContestSlug": "biweekly-contest-10"
        },
        {
            "Rating": 1387.9431104106,
            "ID": 1302,
            "ContestSlug": "biweekly-contest-16"
        },
        {
            "Rating": 1387.7347071166,
            "ID": 2389,
            "ContestSlug": "weekly-contest-308"
        },
        {
            "Rating": 1387.3672639293,
            "ID": 937,
            "ContestSlug": "weekly-contest-110"
        },
        {
            "Rating": 1387.2941868867,
            "ID": 1860,
            "ContestSlug": "biweekly-contest-52"
        },
        {
            "Rating": 1386.9203620297,
            "ID": 1721,
            "ContestSlug": "weekly-contest-223"
        },
        {
            "Rating": 1386.3256313989,
            "ID": 1276,
            "ContestSlug": "weekly-contest-165"
        },
        {
            "Rating": 1384.4078082338,
            "ID": 1271,
            "ContestSlug": "biweekly-contest-14"
        },
        {
            "Rating": 1384.0226911434,
            "ID": 2091,
            "ContestSlug": "weekly-contest-269"
        },
        {
            "Rating": 1383.4424411643,
            "ID": 762,
            "ContestSlug": "weekly-contest-67"
        },
        {
            "Rating": 1382.760607823,
            "ID": 1318,
            "ContestSlug": "weekly-contest-171"
        },
        {
            "Rating": 1382.7178688716,
            "ID": 849,
            "ContestSlug": "weekly-contest-88"
        },
        {
            "Rating": 1382.5129151601,
            "ID": 797,
            "ContestSlug": "weekly-contest-75"
        },
        {
            "Rating": 1382.4809893713,
            "ID": 1185,
            "ContestSlug": "weekly-contest-153"
        },
        {
            "Rating": 1381.2168789318,
            "ID": 1881,
            "ContestSlug": "weekly-contest-243"
        },
        {
            "Rating": 1381.0888968455,
            "ID": 2410,
            "ContestSlug": "biweekly-contest-87"
        },
        {
            "Rating": 1380.1541980647,
            "ID": 814,
            "ContestSlug": "weekly-contest-79"
        },
        {
            "Rating": 1380.0192844155,
            "ID": 1828,
            "ContestSlug": "biweekly-contest-50"
        },
        {
            "Rating": 1379.8787648129,
            "ID": 2120,
            "ContestSlug": "weekly-contest-273"
        },
        {
            "Rating": 1378.7570411077,
            "ID": 1013,
            "ContestSlug": "weekly-contest-129"
        },
        {
            "Rating": 1377.6120218199,
            "ID": 811,
            "ContestSlug": "weekly-contest-78"
        },
        {
            "Rating": 1377.1913915125,
            "ID": 1010,
            "ContestSlug": "weekly-contest-128"
        },
        {
            "Rating": 1376.4549624575,
            "ID": 1018,
            "ContestSlug": "weekly-contest-130"
        },
        {
            "Rating": 1376.2600892096,
            "ID": 807,
            "ContestSlug": "weekly-contest-77"
        },
        {
            "Rating": 1375.0376362104,
            "ID": 2336,
            "ContestSlug": "weekly-contest-301"
        },
        {
            "Rating": 1375.0234414965,
            "ID": 1288,
            "ContestSlug": "biweekly-contest-15"
        },
        {
            "Rating": 1374.6755455786,
            "ID": 1038,
            "ContestSlug": "weekly-contest-135"
        },
        {
            "Rating": 1374.574900311,
            "ID": 1267,
            "ContestSlug": "weekly-contest-164"
        },
        {
            "Rating": 1374.3549007913,
            "ID": 1619,
            "ContestSlug": "biweekly-contest-37"
        },
        {
            "Rating": 1373.8113453501,
            "ID": 1291,
            "ContestSlug": "weekly-contest-167"
        },
        {
            "Rating": 1372.7398808669,
            "ID": 748,
            "ContestSlug": "weekly-contest-63"
        },
        {
            "Rating": 1372.1152262488,
            "ID": 1863,
            "ContestSlug": "weekly-contest-241"
        },
        {
            "Rating": 1371.8092952004,
            "ID": 2244,
            "ContestSlug": "weekly-contest-289"
        },
        {
            "Rating": 1370.6144908238,
            "ID": 914,
            "ContestSlug": "weekly-contest-104"
        },
        {
            "Rating": 1370.4186698287,
            "ID": 1854,
            "ContestSlug": "weekly-contest-240"
        },
        {
            "Rating": 1369.614440152,
            "ID": 1608,
            "ContestSlug": "weekly-contest-209"
        },
        {
            "Rating": 1369.0053354603,
            "ID": 1370,
            "ContestSlug": "biweekly-contest-21"
        },
        {
            "Rating": 1368.0043517215,
            "ID": 1576,
            "ContestSlug": "weekly-contest-205"
        },
        {
            "Rating": 1365.2269076492,
            "ID": 2231,
            "ContestSlug": "weekly-contest-288"
        },
        {
            "Rating": 1364.6787168645,
            "ID": 2260,
            "ContestSlug": "weekly-contest-291"
        },
        {
            "Rating": 1364.154859918,
            "ID": 1974,
            "ContestSlug": "biweekly-contest-59"
        },
        {
            "Rating": 1362.6613797387,
            "ID": 1592,
            "ContestSlug": "weekly-contest-207"
        },
        {
            "Rating": 1361.8801013336,
            "ID": 1120,
            "ContestSlug": "biweekly-contest-4"
        },
        {
            "Rating": 1361.6459603518,
            "ID": 1980,
            "ContestSlug": "weekly-contest-255"
        },
        {
            "Rating": 1361.5824742947,
            "ID": 2165,
            "ContestSlug": "weekly-contest-279"
        },
        {
            "Rating": 1360.421258727,
            "ID": 2335,
            "ContestSlug": "weekly-contest-301"
        },
        {
            "Rating": 1360.3005775112,
            "ID": 1817,
            "ContestSlug": "weekly-contest-235"
        },
        {
            "Rating": 1360.2184128413,
            "ID": 1448,
            "ContestSlug": "biweekly-contest-26"
        },
        {
            "Rating": 1360.0511262593,
            "ID": 2379,
            "ContestSlug": "biweekly-contest-85"
        },
        {
            "Rating": 1358.3561730566,
            "ID": 746,
            "ContestSlug": "weekly-contest-63"
        },
        {
            "Rating": 1358.152613403,
            "ID": 2090,
            "ContestSlug": "weekly-contest-269"
        },
        {
            "Rating": 1357.6553050616,
            "ID": 1957,
            "ContestSlug": "biweekly-contest-58"
        },
        {
            "Rating": 1356.6925765299,
            "ID": 2037,
            "ContestSlug": "biweekly-contest-63"
        },
        {
            "Rating": 1356.1920189231,
            "ID": 2043,
            "ContestSlug": "weekly-contest-263"
        },
        {
            "Rating": 1355.9817184778,
            "ID": 1331,
            "ContestSlug": "biweekly-contest-18"
        },
        {
            "Rating": 1355.5386161215,
            "ID": 1894,
            "ContestSlug": "biweekly-contest-54"
        },
        {
            "Rating": 1355.3956434989,
            "ID": 2405,
            "ContestSlug": "weekly-contest-310"
        },
        {
            "Rating": 1355.3825442341,
            "ID": 1689,
            "ContestSlug": "weekly-contest-219"
        },
        {
            "Rating": 1354.5231125217,
            "ID": 2210,
            "ContestSlug": "weekly-contest-285"
        },
        {
            "Rating": 1354.1247827015,
            "ID": 1244,
            "ContestSlug": "biweekly-contest-12"
        },
        {
            "Rating": 1353.629677812,
            "ID": 1758,
            "ContestSlug": "weekly-contest-228"
        },
        {
            "Rating": 1352.7250049956,
            "ID": 848,
            "ContestSlug": "weekly-contest-88"
        },
        {
            "Rating": 1352.1791099256,
            "ID": 1995,
            "ContestSlug": "weekly-contest-257"
        },
        {
            "Rating": 1351.4184681108,
            "ID": 1513,
            "ContestSlug": "weekly-contest-197"
        },
        {
            "Rating": 1350.6048768377,
            "ID": 2053,
            "ContestSlug": "biweekly-contest-64"
        },
        {
            "Rating": 1348.670191438,
            "ID": 1100,
            "ContestSlug": "biweekly-contest-3"
        },
        {
            "Rating": 1348.0079390256,
            "ID": 1029,
            "ContestSlug": "weekly-contest-133"
        },
        {
            "Rating": 1347.8521638635,
            "ID": 2390,
            "ContestSlug": "weekly-contest-308"
        },
        {
            "Rating": 1346.9594471871,
            "ID": 2284,
            "ContestSlug": "biweekly-contest-79"
        },
        {
            "Rating": 1346.3556309143,
            "ID": 2027,
            "ContestSlug": "weekly-contest-261"
        },
        {
            "Rating": 1345.737168609,
            "ID": 1679,
            "ContestSlug": "weekly-contest-218"
        },
        {
            "Rating": 1344.226133202,
            "ID": 1544,
            "ContestSlug": "weekly-contest-201"
        },
        {
            "Rating": 1343.628913055,
            "ID": 1395,
            "ContestSlug": "weekly-contest-182"
        },
        {
            "Rating": 1341.8397242604,
            "ID": 1796,
            "ContestSlug": "biweekly-contest-48"
        },
        {
            "Rating": 1341.5076441361,
            "ID": 784,
            "ContestSlug": "weekly-contest-72"
        },
        {
            "Rating": 1341.3713970313,
            "ID": 2023,
            "ContestSlug": "biweekly-contest-62"
        },
        {
            "Rating": 1341.2659819842,
            "ID": 859,
            "ContestSlug": "weekly-contest-90"
        },
        {
            "Rating": 1341.0476642293,
            "ID": 1399,
            "ContestSlug": "biweekly-contest-23"
        },
        {
            "Rating": 1340.5559417151,
            "ID": 976,
            "ContestSlug": "weekly-contest-119"
        },
        {
            "Rating": 1338.8322315568,
            "ID": 970,
            "ContestSlug": "weekly-contest-118"
        },
        {
            "Rating": 1337.8472367494,
            "ID": 933,
            "ContestSlug": "weekly-contest-109"
        },
        {
            "Rating": 1337.6115578703,
            "ID": 2161,
            "ContestSlug": "biweekly-contest-71"
        },
        {
            "Rating": 1337.3722299775,
            "ID": 1260,
            "ContestSlug": "weekly-contest-163"
        },
        {
            "Rating": 1336.9494482313,
            "ID": 1275,
            "ContestSlug": "weekly-contest-165"
        },
        {
            "Rating": 1335.0295688697,
            "ID": 938,
            "ContestSlug": "weekly-contest-110"
        },
        {
            "Rating": 1334.5718985411,
            "ID": 1409,
            "ContestSlug": "weekly-contest-184"
        },
        {
            "Rating": 1334.5708444649,
            "ID": 2126,
            "ContestSlug": "weekly-contest-274"
        },
        {
            "Rating": 1334.0564009231,
            "ID": 888,
            "ContestSlug": "weekly-contest-98"
        },
        {
            "Rating": 1334.0516779626,
            "ID": 2270,
            "ContestSlug": "biweekly-contest-78"
        },
        {
            "Rating": 1333.3138174157,
            "ID": 1805,
            "ContestSlug": "weekly-contest-234"
        },
        {
            "Rating": 1333.192050397,
            "ID": 2181,
            "ContestSlug": "weekly-contest-281"
        },
        {
            "Rating": 1332.622596763,
            "ID": 1128,
            "ContestSlug": "weekly-contest-146"
        },
        {
            "Rating": 1332.6187879411,
            "ID": 2274,
            "ContestSlug": "weekly-contest-293"
        },
        {
            "Rating": 1332.4653491345,
            "ID": 1471,
            "ContestSlug": "weekly-contest-192"
        },
        {
            "Rating": 1331.5287857686,
            "ID": 2259,
            "ContestSlug": "weekly-contest-291"
        },
        {
            "Rating": 1331.3935128035,
            "ID": 2373,
            "ContestSlug": "weekly-contest-306"
        },
        {
            "Rating": 1330.918577828,
            "ID": 1347,
            "ContestSlug": "weekly-contest-175"
        },
        {
            "Rating": 1328.7281033317,
            "ID": 1324,
            "ContestSlug": "weekly-contest-172"
        },
        {
            "Rating": 1328.5499677186,
            "ID": 2396,
            "ContestSlug": "biweekly-contest-86"
        },
        {
            "Rating": 1328.513147726,
            "ID": 1812,
            "ContestSlug": "biweekly-contest-49"
        },
        {
            "Rating": 1327.0282989915,
            "ID": 1086,
            "ContestSlug": "biweekly-contest-2"
        },
        {
            "Rating": 1326.4047670018,
            "ID": 1476,
            "ContestSlug": "biweekly-contest-28"
        },
        {
            "Rating": 1325.3607218257,
            "ID": 2073,
            "ContestSlug": "weekly-contest-267"
        },
        {
            "Rating": 1324.5696223867,
            "ID": 1344,
            "ContestSlug": "biweekly-contest-19"
        },
        {
            "Rating": 1324.5320836804,
            "ID": 1752,
            "ContestSlug": "weekly-contest-227"
        },
        {
            "Rating": 1324.3520304377,
            "ID": 2095,
            "ContestSlug": "weekly-contest-270"
        },
        {
            "Rating": 1324.1757200103,
            "ID": 1603,
            "ContestSlug": "biweekly-contest-36"
        },
        {
            "Rating": 1323.8236471852,
            "ID": 1925,
            "ContestSlug": "biweekly-contest-56"
        },
        {
            "Rating": 1322.8302750313,
            "ID": 1614,
            "ContestSlug": "weekly-contest-210"
        },
        {
            "Rating": 1322.5926536743,
            "ID": 1936,
            "ContestSlug": "weekly-contest-250"
        },
        {
            "Rating": 1321.9346201204,
            "ID": 1694,
            "ContestSlug": "weekly-contest-220"
        },
        {
            "Rating": 1321.2748903388,
            "ID": 1582,
            "ContestSlug": "weekly-contest-206"
        },
        {
            "Rating": 1320.6485731562,
            "ID": 2079,
            "ContestSlug": "weekly-contest-268"
        },
        {
            "Rating": 1317.9521104466,
            "ID": 999,
            "ContestSlug": "weekly-contest-125"
        },
        {
            "Rating": 1317.9207508583,
            "ID": 2130,
            "ContestSlug": "biweekly-contest-69"
        },
        {
            "Rating": 1317.4638832497,
            "ID": 1313,
            "ContestSlug": "biweekly-contest-17"
        },
        {
            "Rating": 1317.2976846981,
            "ID": 2221,
            "ContestSlug": "biweekly-contest-75"
        },
        {
            "Rating": 1317.1729927899,
            "ID": 1343,
            "ContestSlug": "biweekly-contest-19"
        },
        {
            "Rating": 1316.2046992429,
            "ID": 2225,
            "ContestSlug": "weekly-contest-287"
        },
        {
            "Rating": 1315.8569286597,
            "ID": 2348,
            "ContestSlug": "biweekly-contest-83"
        },
        {
            "Rating": 1315.4085759361,
            "ID": 1180,
            "ContestSlug": "biweekly-contest-8"
        },
        {
            "Rating": 1315.3715333947,
            "ID": 1629,
            "ContestSlug": "weekly-contest-212"
        },
        {
            "Rating": 1315.1890809249,
            "ID": 2109,
            "ContestSlug": "weekly-contest-272"
        },
        {
            "Rating": 1314.8600143277,
            "ID": 1827,
            "ContestSlug": "biweekly-contest-50"
        },
        {
            "Rating": 1314.2912238536,
            "ID": 2160,
            "ContestSlug": "biweekly-contest-71"
        },
        {
            "Rating": 1311.3495317884,
            "ID": 1021,
            "ContestSlug": "weekly-contest-131"
        },
        {
            "Rating": 1310.9129840277,
            "ID": 2058,
            "ContestSlug": "weekly-contest-265"
        },
        {
            "Rating": 1309.8100518373,
            "ID": 1710,
            "ContestSlug": "weekly-contest-222"
        },
        {
            "Rating": 1309.3113721825,
            "ID": 1451,
            "ContestSlug": "weekly-contest-189"
        },
        {
            "Rating": 1309.1422268153,
            "ID": 1897,
            "ContestSlug": "weekly-contest-245"
        },
        {
            "Rating": 1308.9617729374,
            "ID": 2342,
            "ContestSlug": "weekly-contest-302"
        },
        {
            "Rating": 1308.948547975,
            "ID": 2264,
            "ContestSlug": "weekly-contest-292"
        },
        {
            "Rating": 1307.9800903088,
            "ID": 1064,
            "ContestSlug": "biweekly-contest-1"
        },
        {
            "Rating": 1307.5663523368,
            "ID": 804,
            "ContestSlug": "weekly-contest-77"
        },
        {
            "Rating": 1307.4608905199,
            "ID": 2085,
            "ContestSlug": "biweekly-contest-66"
        },
        {
            "Rating": 1307.3797385769,
            "ID": 1893,
            "ContestSlug": "biweekly-contest-54"
        },
        {
            "Rating": 1307.3265298181,
            "ID": 2022,
            "ContestSlug": "biweekly-contest-62"
        },
        {
            "Rating": 1307.2991245272,
            "ID": 868,
            "ContestSlug": "weekly-contest-93"
        },
        {
            "Rating": 1306.2821637677,
            "ID": 1984,
            "ContestSlug": "weekly-contest-256"
        },
        {
            "Rating": 1303.5594588137,
            "ID": 2331,
            "ContestSlug": "biweekly-contest-82"
        },
        {
            "Rating": 1303.3201984827,
            "ID": 783,
            "ContestSlug": "weekly-contest-71"
        },
        {
            "Rating": 1303.022570497,
            "ID": 1338,
            "ContestSlug": "weekly-contest-174"
        },
        {
            "Rating": 1303.0179795942,
            "ID": 1051,
            "ContestSlug": "weekly-contest-138"
        },
        {
            "Rating": 1302.7005460171,
            "ID": 1266,
            "ContestSlug": "weekly-contest-164"
        },
        {
            "Rating": 1302.6469071738,
            "ID": 1991,
            "ContestSlug": "biweekly-contest-60"
        },
        {
            "Rating": 1301.9432665133,
            "ID": 2243,
            "ContestSlug": "weekly-contest-289"
        },
        {
            "Rating": 1301.4117757184,
            "ID": 806,
            "ContestSlug": "weekly-contest-77"
        },
        {
            "Rating": 1301.4027057843,
            "ID": 1646,
            "ContestSlug": "weekly-contest-214"
        },
        {
            "Rating": 1301.381757401,
            "ID": 1877,
            "ContestSlug": "biweekly-contest-53"
        },
        {
            "Rating": 1300.9041426403,
            "ID": 1844,
            "ContestSlug": "biweekly-contest-51"
        },
        {
            "Rating": 1300.8009461582,
            "ID": 1790,
            "ContestSlug": "weekly-contest-232"
        },
        {
            "Rating": 1299.8393735643,
            "ID": 2287,
            "ContestSlug": "weekly-contest-295"
        },
        {
            "Rating": 1299.6035132992,
            "ID": 953,
            "ContestSlug": "weekly-contest-114"
        },
        {
            "Rating": 1298.5921473119,
            "ID": 908,
            "ContestSlug": "weekly-contest-103"
        },
        {
            "Rating": 1297.5338328524,
            "ID": 819,
            "ContestSlug": "weekly-contest-80"
        },
        {
            "Rating": 1297.3006230632,
            "ID": 1598,
            "ContestSlug": "weekly-contest-208"
        },
        {
            "Rating": 1295.8868965907,
            "ID": 2224,
            "ContestSlug": "weekly-contest-287"
        },
        {
            "Rating": 1295.4970938463,
            "ID": 1539,
            "ContestSlug": "biweekly-contest-32"
        },
        {
            "Rating": 1294.7724244077,
            "ID": 1769,
            "ContestSlug": "weekly-contest-229"
        },
        {
            "Rating": 1294.5800368625,
            "ID": 2273,
            "ContestSlug": "weekly-contest-293"
        },
        {
            "Rating": 1294.5297034757,
            "ID": 1716,
            "ContestSlug": "biweekly-contest-43"
        },
        {
            "Rating": 1293.4904281819,
            "ID": 1551,
            "ContestSlug": "weekly-contest-202"
        },
        {
            "Rating": 1290.0361853035,
            "ID": 1859,
            "ContestSlug": "biweekly-contest-52"
        },
        {
            "Rating": 1289.1912178611,
            "ID": 2190,
            "ContestSlug": "biweekly-contest-73"
        },
        {
            "Rating": 1288.5621697906,
            "ID": 1684,
            "ContestSlug": "biweekly-contest-41"
        },
        {
            "Rating": 1288.1970048184,
            "ID": 1403,
            "ContestSlug": "weekly-contest-183"
        },
        {
            "Rating": 1287.9002757199,
            "ID": 993,
            "ContestSlug": "weekly-contest-124"
        },
        {
            "Rating": 1287.8970301681,
            "ID": 872,
            "ContestSlug": "weekly-contest-94"
        },
        {
            "Rating": 1287.1053917452,
            "ID": 1103,
            "ContestSlug": "weekly-contest-143"
        },
        {
            "Rating": 1286.7934718934,
            "ID": 1791,
            "ContestSlug": "weekly-contest-232"
        },
        {
            "Rating": 1286.3841359213,
            "ID": 2352,
            "ContestSlug": "weekly-contest-303"
        },
        {
            "Rating": 1286.3167937403,
            "ID": 1047,
            "ContestSlug": "weekly-contest-137"
        },
        {
            "Rating": 1285.9726675488,
            "ID": 1381,
            "ContestSlug": "weekly-contest-180"
        },
        {
            "Rating": 1285.7282180721,
            "ID": 860,
            "ContestSlug": "weekly-contest-91"
        },
        {
            "Rating": 1284.4514662456,
            "ID": 1720,
            "ContestSlug": "weekly-contest-223"
        },
        {
            "Rating": 1284.3625733813,
            "ID": 1481,
            "ContestSlug": "weekly-contest-193"
        },
        {
            "Rating": 1283.6412252736,
            "ID": 2303,
            "ContestSlug": "weekly-contest-297"
        },
        {
            "Rating": 1283.51021448,
            "ID": 1507,
            "ContestSlug": "biweekly-contest-30"
        },
        {
            "Rating": 1283.4980318021,
            "ID": 1252,
            "ContestSlug": "weekly-contest-162"
        },
        {
            "Rating": 1282.4111853142,
            "ID": 1837,
            "ContestSlug": "weekly-contest-238"
        },
        {
            "Rating": 1282.1502428906,
            "ID": 2220,
            "ContestSlug": "biweekly-contest-75"
        },
        {
            "Rating": 1281.9771427903,
            "ID": 1624,
            "ContestSlug": "weekly-contest-211"
        },
        {
            "Rating": 1280.2941647587,
            "ID": 1572,
            "ContestSlug": "biweekly-contest-34"
        },
        {
            "Rating": 1280.2203734882,
            "ID": 2125,
            "ContestSlug": "weekly-contest-274"
        },
        {
            "Rating": 1279.7894769956,
            "ID": 2269,
            "ContestSlug": "biweekly-contest-78"
        },
        {
            "Rating": 1279.7669712099,
            "ID": 1002,
            "ContestSlug": "weekly-contest-126"
        },
        {
            "Rating": 1279.3383966145,
            "ID": 1534,
            "ContestSlug": "weekly-contest-200"
        },
        {
            "Rating": 1277.9987709491,
            "ID": 1742,
            "ContestSlug": "weekly-contest-226"
        },
        {
            "Rating": 1277.8260125315,
            "ID": 1317,
            "ContestSlug": "weekly-contest-171"
        },
        {
            "Rating": 1275.6108152653,
            "ID": 2150,
            "ContestSlug": "weekly-contest-277"
        },
        {
            "Rating": 1274.881752217,
            "ID": 2129,
            "ContestSlug": "biweekly-contest-69"
        },
        {
            "Rating": 1274.7596170193,
            "ID": 1078,
            "ContestSlug": "weekly-contest-140"
        },
        {
            "Rating": 1274.6742564805,
            "ID": 1005,
            "ContestSlug": "weekly-contest-127"
        },
        {
            "Rating": 1273.0588534723,
            "ID": 2068,
            "ContestSlug": "biweekly-contest-65"
        },
        {
            "Rating": 1273.046473797,
            "ID": 2138,
            "ContestSlug": "weekly-contest-276"
        },
        {
            "Rating": 1271.7726574892,
            "ID": 2006,
            "ContestSlug": "biweekly-contest-61"
        },
        {
            "Rating": 1271.7055549365,
            "ID": 824,
            "ContestSlug": "weekly-contest-82"
        },
        {
            "Rating": 1271.3776510163,
            "ID": 1556,
            "ContestSlug": "biweekly-contest-33"
        },
        {
            "Rating": 1271.3313760514,
            "ID": 925,
            "ContestSlug": "weekly-contest-107"
        },
        {
            "Rating": 1270.6712381632,
            "ID": 2363,
            "ContestSlug": "biweekly-contest-84"
        },
        {
            "Rating": 1269.7567553523,
            "ID": 2032,
            "ContestSlug": "weekly-contest-262"
        },
        {
            "Rating": 1268.5768566953,
            "ID": 1447,
            "ContestSlug": "biweekly-contest-26"
        },
        {
            "Rating": 1268.0287696194,
            "ID": 2325,
            "ContestSlug": "weekly-contest-300"
        },
        {
            "Rating": 1267.223591366,
            "ID": 1282,
            "ContestSlug": "weekly-contest-166"
        },
        {
            "Rating": 1266.341468955,
            "ID": 2200,
            "ContestSlug": "weekly-contest-284"
        },
        {
            "Rating": 1266.3368046515,
            "ID": 821,
            "ContestSlug": "weekly-contest-81"
        },
        {
            "Rating": 1264.4836883082,
            "ID": 1736,
            "ContestSlug": "weekly-contest-225"
        },
        {
            "Rating": 1264.4778916192,
            "ID": 2248,
            "ContestSlug": "weekly-contest-290"
        },
        {
            "Rating": 1264.2868345638,
            "ID": 2133,
            "ContestSlug": "weekly-contest-275"
        },
        {
            "Rating": 1263.2728668041,
            "ID": 1456,
            "ContestSlug": "weekly-contest-190"
        },
        {
            "Rating": 1262.5890311992,
            "ID": 1089,
            "ContestSlug": "weekly-contest-141"
        },
        {
            "Rating": 1260.9112824221,
            "ID": 2144,
            "ContestSlug": "biweekly-contest-70"
        },
        {
            "Rating": 1260.870208308,
            "ID": 2255,
            "ContestSlug": "biweekly-contest-77"
        },
        {
            "Rating": 1260.1755576607,
            "ID": 1305,
            "ContestSlug": "weekly-contest-169"
        },
        {
            "Rating": 1259.5707438932,
            "ID": 1779,
            "ContestSlug": "biweekly-contest-47"
        },
        {
            "Rating": 1259.409726189,
            "ID": 884,
            "ContestSlug": "weekly-contest-97"
        },
        {
            "Rating": 1259.3406231708,
            "ID": 2404,
            "ContestSlug": "weekly-contest-310"
        },
        {
            "Rating": 1259.1979660519,
            "ID": 1213,
            "ContestSlug": "biweekly-contest-10"
        },
        {
            "Rating": 1258.8401788462,
            "ID": 867,
            "ContestSlug": "weekly-contest-92"
        },
        {
            "Rating": 1258.6719675401,
            "ID": 896,
            "ContestSlug": "weekly-contest-100"
        },
        {
            "Rating": 1257.7670945029,
            "ID": 2103,
            "ContestSlug": "weekly-contest-271"
        },
        {
            "Rating": 1257.7082143289,
            "ID": 1356,
            "ContestSlug": "biweekly-contest-20"
        },
        {
            "Rating": 1257.679633165,
            "ID": 1309,
            "ContestSlug": "weekly-contest-170"
        },
        {
            "Rating": 1257.323514611,
            "ID": 2114,
            "ContestSlug": "biweekly-contest-68"
        },
        {
            "Rating": 1257.264923599,
            "ID": 2042,
            "ContestSlug": "weekly-contest-263"
        },
        {
            "Rating": 1257.1556875655,
            "ID": 2177,
            "ContestSlug": "biweekly-contest-72"
        },
        {
            "Rating": 1257.1166915286,
            "ID": 2180,
            "ContestSlug": "weekly-contest-281"
        },
        {
            "Rating": 1256.6807087287,
            "ID": 1732,
            "ContestSlug": "biweekly-contest-44"
        },
        {
            "Rating": 1256.4891142083,
            "ID": 1085,
            "ContestSlug": "biweekly-contest-2"
        },
        {
            "Rating": 1256.0514740971,
            "ID": 2239,
            "ContestSlug": "biweekly-contest-76"
        },
        {
            "Rating": 1255.9002796024,
            "ID": 1037,
            "ContestSlug": "weekly-contest-135"
        },
        {
            "Rating": 1254.8626139269,
            "ID": 1945,
            "ContestSlug": "weekly-contest-251"
        },
        {
            "Rating": 1253.4847783954,
            "ID": 2283,
            "ContestSlug": "biweekly-contest-79"
        },
        {
            "Rating": 1253.1463945043,
            "ID": 2194,
            "ContestSlug": "weekly-contest-283"
        },
        {
            "Rating": 1253.1107481745,
            "ID": 2186,
            "ContestSlug": "weekly-contest-282"
        },
        {
            "Rating": 1252.8406166148,
            "ID": 2164,
            "ContestSlug": "weekly-contest-279"
        },
        {
            "Rating": 1252.7479413966,
            "ID": 1833,
            "ContestSlug": "weekly-contest-237"
        },
        {
            "Rating": 1251.822378691,
            "ID": 830,
            "ContestSlug": "weekly-contest-83"
        },
        {
            "Rating": 1250.8974254752,
            "ID": 2315,
            "ContestSlug": "biweekly-contest-81"
        },
        {
            "Rating": 1249.9947800752,
            "ID": 1150,
            "ContestSlug": "biweekly-contest-6"
        },
        {
            "Rating": 1249.9086403595,
            "ID": 1161,
            "ContestSlug": "weekly-contest-150"
        },
        {
            "Rating": 1249.8425270142,
            "ID": 2395,
            "ContestSlug": "biweekly-contest-86"
        },
        {
            "Rating": 1249.4294341104,
            "ID": 766,
            "ContestSlug": "weekly-contest-68"
        },
        {
            "Rating": 1249.2572200035,
            "ID": 2279,
            "ContestSlug": "weekly-contest-294"
        },
        {
            "Rating": 1248.8547072235,
            "ID": 1903,
            "ContestSlug": "weekly-contest-246"
        },
        {
            "Rating": 1248.8026990632,
            "ID": 1196,
            "ContestSlug": "biweekly-contest-9"
        },
        {
            "Rating": 1248.7224675206,
            "ID": 1876,
            "ContestSlug": "biweekly-contest-53"
        },
        {
            "Rating": 1247.3198836387,
            "ID": 1232,
            "ContestSlug": "weekly-contest-159"
        },
        {
            "Rating": 1246.0141927368,
            "ID": 2016,
            "ContestSlug": "weekly-contest-260"
        },
        {
            "Rating": 1245.2999833877,
            "ID": 1518,
            "ContestSlug": "weekly-contest-198"
        },
        {
            "Rating": 1245.2741257148,
            "ID": 1099,
            "ContestSlug": "biweekly-contest-3"
        },
        {
            "Rating": 1244.317367883,
            "ID": 1228,
            "ContestSlug": "biweekly-contest-11"
        },
        {
            "Rating": 1243.6250741657,
            "ID": 2399,
            "ContestSlug": "weekly-contest-309"
        },
        {
            "Rating": 1243.1009943284,
            "ID": 832,
            "ContestSlug": "weekly-contest-84"
        },
        {
            "Rating": 1242.8939284628,
            "ID": 2309,
            "ContestSlug": "weekly-contest-298"
        },
        {
            "Rating": 1242.6172898768,
            "ID": 1941,
            "ContestSlug": "biweekly-contest-57"
        },
        {
            "Rating": 1242.4710735813,
            "ID": 921,
            "ContestSlug": "weekly-contest-106"
        },
        {
            "Rating": 1241.9262857175,
            "ID": 1417,
            "ContestSlug": "weekly-contest-185"
        },
        {
            "Rating": 1241.5645130241,
            "ID": 2347,
            "ContestSlug": "biweekly-contest-83"
        },
        {
            "Rating": 1241.5396695569,
            "ID": 2299,
            "ContestSlug": "biweekly-contest-80"
        },
        {
            "Rating": 1241.0825147417,
            "ID": 2293,
            "ContestSlug": "weekly-contest-296"
        },
        {
            "Rating": 1240.829758176,
            "ID": 2078,
            "ContestSlug": "weekly-contest-268"
        },
        {
            "Rating": 1237.7565585875,
            "ID": 1422,
            "ContestSlug": "weekly-contest-186"
        },
        {
            "Rating": 1235.9216009709,
            "ID": 2149,
            "ContestSlug": "weekly-contest-277"
        },
        {
            "Rating": 1235.8413685224,
            "ID": 2154,
            "ContestSlug": "weekly-contest-278"
        },
        {
            "Rating": 1235.6114196155,
            "ID": 1816,
            "ContestSlug": "weekly-contest-235"
        },
        {
            "Rating": 1234.8049089605,
            "ID": 1385,
            "ContestSlug": "biweekly-contest-22"
        },
        {
            "Rating": 1234.7692637513,
            "ID": 989,
            "ContestSlug": "weekly-contest-123"
        },
        {
            "Rating": 1234.7084656358,
            "ID": 1009,
            "ContestSlug": "weekly-contest-128"
        },
        {
            "Rating": 1234.4144116814,
            "ID": 1184,
            "ContestSlug": "weekly-contest-153"
        },
        {
            "Rating": 1234.058537565,
            "ID": 1961,
            "ContestSlug": "weekly-contest-253"
        },
        {
            "Rating": 1232.8314427996,
            "ID": 1119,
            "ContestSlug": "biweekly-contest-4"
        },
        {
            "Rating": 1231.999241335,
            "ID": 1492,
            "ContestSlug": "biweekly-contest-29"
        },
        {
            "Rating": 1231.8671440198,
            "ID": 1967,
            "ContestSlug": "weekly-contest-254"
        },
        {
            "Rating": 1231.6157956848,
            "ID": 876,
            "ContestSlug": "weekly-contest-95"
        },
        {
            "Rating": 1231.4004525633,
            "ID": 1134,
            "ContestSlug": "biweekly-contest-5"
        },
        {
            "Rating": 1229.4850365142,
            "ID": 1725,
            "ContestSlug": "weekly-contest-224"
        },
        {
            "Rating": 1229.1709574783,
            "ID": 1800,
            "ContestSlug": "weekly-contest-233"
        },
        {
            "Rating": 1228.630993648,
            "ID": 917,
            "ContestSlug": "weekly-contest-105"
        },
        {
            "Rating": 1228.4824438011,
            "ID": 1748,
            "ContestSlug": "biweekly-contest-45"
        },
        {
            "Rating": 1227.7906887239,
            "ID": 844,
            "ContestSlug": "weekly-contest-87"
        },
        {
            "Rating": 1227.3485530532,
            "ID": 1118,
            "ContestSlug": "biweekly-contest-4"
        },
        {
            "Rating": 1226.8332278145,
            "ID": 1935,
            "ContestSlug": "weekly-contest-250"
        },
        {
            "Rating": 1226.2960135431,
            "ID": 1133,
            "ContestSlug": "biweekly-contest-5"
        },
        {
            "Rating": 1225.3923012413,
            "ID": 2357,
            "ContestSlug": "weekly-contest-304"
        },
        {
            "Rating": 1225.3601348675,
            "ID": 1346,
            "ContestSlug": "weekly-contest-175"
        },
        {
            "Rating": 1224.7606792444,
            "ID": 1337,
            "ContestSlug": "weekly-contest-174"
        },
        {
            "Rating": 1223.406570396,
            "ID": 2206,
            "ContestSlug": "biweekly-contest-74"
        },
        {
            "Rating": 1223.3861903833,
            "ID": 1408,
            "ContestSlug": "weekly-contest-184"
        },
        {
            "Rating": 1221.9872943569,
            "ID": 1678,
            "ContestSlug": "weekly-contest-218"
        },
        {
            "Rating": 1221.8477681772,
            "ID": 2414,
            "ContestSlug": "weekly-contest-311"
        },
        {
            "Rating": 1221.6801628274,
            "ID": 1550,
            "ContestSlug": "weekly-contest-202"
        },
        {
            "Rating": 1219.5284561367,
            "ID": 1221,
            "ContestSlug": "weekly-contest-158"
        },
        {
            "Rating": 1219.4252907184,
            "ID": 1299,
            "ContestSlug": "biweekly-contest-16"
        },
        {
            "Rating": 1217.1184374247,
            "ID": 1662,
            "ContestSlug": "weekly-contest-216"
        },
        {
            "Rating": 1216.6376846517,
            "ID": 1848,
            "ContestSlug": "weekly-contest-239"
        },
        {
            "Rating": 1215.7827321325,
            "ID": 2176,
            "ContestSlug": "biweekly-contest-72"
        },
        {
            "Rating": 1215.7443346869,
            "ID": 2108,
            "ContestSlug": "weekly-contest-272"
        },
        {
            "Rating": 1213.8073621345,
            "ID": 973,
            "ContestSlug": "weekly-contest-119"
        },
        {
            "Rating": 1212.2606422181,
            "ID": 1475,
            "ContestSlug": "biweekly-contest-28"
        },
        {
            "Rating": 1212.2309421538,
            "ID": 1413,
            "ContestSlug": "biweekly-contest-24"
        },
        {
            "Rating": 1209.6571020247,
            "ID": 1822,
            "ContestSlug": "weekly-contest-236"
        },
        {
            "Rating": 1209.3722198224,
            "ID": 1523,
            "ContestSlug": "biweekly-contest-31"
        },
        {
            "Rating": 1208.0417047337,
            "ID": 1389,
            "ContestSlug": "weekly-contest-181"
        },
        {
            "Rating": 1208.0130656905,
            "ID": 941,
            "ContestSlug": "weekly-contest-111"
        },
        {
            "Rating": 1207.7810914125,
            "ID": 1380,
            "ContestSlug": "weekly-contest-180"
        },
        {
            "Rating": 1207.748239075,
            "ID": 2215,
            "ContestSlug": "weekly-contest-286"
        },
        {
            "Rating": 1207.7224406285,
            "ID": 1704,
            "ContestSlug": "weekly-contest-221"
        },
        {
            "Rating": 1206.1240971343,
            "ID": 1784,
            "ContestSlug": "weekly-contest-231"
        },
        {
            "Rating": 1205.6698455508,
            "ID": 1160,
            "ContestSlug": "weekly-contest-150"
        },
        {
            "Rating": 1204.9864820183,
            "ID": 1869,
            "ContestSlug": "weekly-contest-242"
        },
        {
            "Rating": 1203.7504950404,
            "ID": 1952,
            "ContestSlug": "weekly-contest-252"
        },
        {
            "Rating": 1203.1408035909,
            "ID": 1688,
            "ContestSlug": "weekly-contest-219"
        },
        {
            "Rating": 1203.0737869081,
            "ID": 2367,
            "ContestSlug": "weekly-contest-305"
        },
        {
            "Rating": 1201.8730954169,
            "ID": 2148,
            "ContestSlug": "weekly-contest-277"
        },
        {
            "Rating": 1201.7686271329,
            "ID": 2124,
            "ContestSlug": "weekly-contest-274"
        },
        {
            "Rating": 1201.6117337798,
            "ID": 997,
            "ContestSlug": "weekly-contest-125"
        },
        {
            "Rating": 1201.3497763919,
            "ID": 1491,
            "ContestSlug": "biweekly-contest-29"
        },
        {
            "Rating": 1200.9464053417,
            "ID": 2319,
            "ContestSlug": "weekly-contest-299"
        },
        {
            "Rating": 1199.8592887103,
            "ID": 2169,
            "ContestSlug": "weekly-contest-280"
        },
        {
            "Rating": 1199.4477805501,
            "ID": 2000,
            "ContestSlug": "weekly-contest-258"
        },
        {
            "Rating": 1199.4427635582,
            "ID": 1154,
            "ContestSlug": "weekly-contest-149"
        },
        {
            "Rating": 1199.2892732505,
            "ID": 929,
            "ContestSlug": "weekly-contest-108"
        },
        {
            "Rating": 1199.2392672964,
            "ID": 1165,
            "ContestSlug": "biweekly-contest-7"
        },
        {
            "Rating": 1198.5705825982,
            "ID": 1200,
            "ContestSlug": "weekly-contest-155"
        },
        {
            "Rating": 1198.4180401014,
            "ID": 985,
            "ContestSlug": "weekly-contest-122"
        },
        {
            "Rating": 1195.7512695571,
            "ID": 1207,
            "ContestSlug": "weekly-contest-156"
        },
        {
            "Rating": 1193.9819783429,
            "ID": 1323,
            "ContestSlug": "weekly-contest-172"
        },
        {
            "Rating": 1193.2687290573,
            "ID": 1437,
            "ContestSlug": "weekly-contest-187"
        },
        {
            "Rating": 1193.1328299324,
            "ID": 1528,
            "ContestSlug": "weekly-contest-199"
        },
        {
            "Rating": 1192.3167969426,
            "ID": 1436,
            "ContestSlug": "weekly-contest-187"
        },
        {
            "Rating": 1188.6470369782,
            "ID": 747,
            "ContestSlug": "weekly-contest-64"
        },
        {
            "Rating": 1188.6311093158,
            "ID": 1122,
            "ContestSlug": "weekly-contest-145"
        },
        {
            "Rating": 1187.1641565458,
            "ID": 1880,
            "ContestSlug": "weekly-contest-243"
        },
        {
            "Rating": 1187.1344261572,
            "ID": 2119,
            "ContestSlug": "weekly-contest-273"
        },
        {
            "Rating": 1184.795721284,
            "ID": 2341,
            "ContestSlug": "weekly-contest-302"
        },
        {
            "Rating": 1184.4264833435,
            "ID": 1979,
            "ContestSlug": "weekly-contest-255"
        },
        {
            "Rating": 1182.6489068544,
            "ID": 1672,
            "ContestSlug": "weekly-contest-217"
        },
        {
            "Rating": 1181.9716216714,
            "ID": 1189,
            "ContestSlug": "weekly-contest-154"
        },
        {
            "Rating": 1181.5839867359,
            "ID": 852,
            "ContestSlug": "weekly-contest-89"
        },
        {
            "Rating": 1180.923623906,
            "ID": 1486,
            "ContestSlug": "weekly-contest-194"
        },
        {
            "Rating": 1180.3543157775,
            "ID": 1441,
            "ContestSlug": "weekly-contest-188"
        },
        {
            "Rating": 1179.1495967491,
            "ID": 1287,
            "ContestSlug": "biweekly-contest-15"
        },
        {
            "Rating": 1178.4942541235,
            "ID": 905,
            "ContestSlug": "weekly-contest-102"
        },
        {
            "Rating": 1177.5660617941,
            "ID": 965,
            "ContestSlug": "weekly-contest-117"
        },
        {
            "Rating": 1176.4547272896,
            "ID": 1431,
            "ContestSlug": "biweekly-contest-25"
        },
        {
            "Rating": 1174.8589329736,
            "ID": 1773,
            "ContestSlug": "weekly-contest-230"
        },
        {
            "Rating": 1173.505926482,
            "ID": 922,
            "ContestSlug": "weekly-contest-106"
        },
        {
            "Rating": 1172.6819789183,
            "ID": 1046,
            "ContestSlug": "weekly-contest-137"
        },
        {
            "Rating": 1172.5106645463,
            "ID": 760,
            "ContestSlug": "weekly-contest-66"
        },
        {
            "Rating": 1167.8737144048,
            "ID": 2057,
            "ContestSlug": "weekly-contest-265"
        },
        {
            "Rating": 1167.1331831913,
            "ID": 1304,
            "ContestSlug": "weekly-contest-169"
        },
        {
            "Rating": 1167.1241589729,
            "ID": 2185,
            "ContestSlug": "weekly-contest-282"
        },
        {
            "Rating": 1167.0749837258,
            "ID": 796,
            "ContestSlug": "weekly-contest-75"
        },
        {
            "Rating": 1166.78818332,
            "ID": 1832,
            "ContestSlug": "weekly-contest-237"
        },
        {
            "Rating": 1166.5264284193,
            "ID": 1768,
            "ContestSlug": "weekly-contest-229"
        },
        {
            "Rating": 1165.4768151611,
            "ID": 1446,
            "ContestSlug": "biweekly-contest-26"
        },
        {
            "Rating": 1165.2135167215,
            "ID": 2011,
            "ContestSlug": "weekly-contest-259"
        },
        {
            "Rating": 1164.8182315157,
            "ID": 771,
            "ContestSlug": "weekly-contest-69"
        },
        {
            "Rating": 1164.0227691933,
            "ID": 1374,
            "ContestSlug": "weekly-contest-179"
        },
        {
            "Rating": 1163.6047095526,
            "ID": 1342,
            "ContestSlug": "biweekly-contest-19"
        },
        {
            "Rating": 1161.8236318927,
            "ID": 2278,
            "ContestSlug": "weekly-contest-294"
        },
        {
            "Rating": 1161.6227767245,
            "ID": 961,
            "ContestSlug": "weekly-contest-116"
        },
        {
            "Rating": 1160.8899403409,
            "ID": 1512,
            "ContestSlug": "weekly-contest-197"
        },
        {
            "Rating": 1160.4439395369,
            "ID": 1920,
            "ContestSlug": "weekly-contest-248"
        },
        {
            "Rating": 1155.4545579447,
            "ID": 2351,
            "ContestSlug": "weekly-contest-303"
        },
        {
            "Rating": 1154.828067979,
            "ID": 1502,
            "ContestSlug": "weekly-contest-196"
        },
        {
            "Rating": 1152.1494742874,
            "ID": 2089,
            "ContestSlug": "weekly-contest-269"
        },
        {
            "Rating": 1152.1377893605,
            "ID": 1365,
            "ContestSlug": "weekly-contest-178"
        },
        {
            "Rating": 1151.5250329621,
            "ID": 1460,
            "ContestSlug": "biweekly-contest-27"
        },
        {
            "Rating": 1151.3534799042,
            "ID": 1290,
            "ContestSlug": "weekly-contest-167"
        },
        {
            "Rating": 1144.9508874557,
            "ID": 2413,
            "ContestSlug": "weekly-contest-311"
        },
        {
            "Rating": 1144.6237559885,
            "ID": 1913,
            "ContestSlug": "weekly-contest-247"
        },
        {
            "Rating": 1142.8650731632,
            "ID": 1137,
            "ContestSlug": "weekly-contest-147"
        },
        {
            "Rating": 1141.2363999461,
            "ID": 1281,
            "ContestSlug": "weekly-contest-166"
        },
        {
            "Rating": 1139.6630206282,
            "ID": 1295,
            "ContestSlug": "weekly-contest-168"
        },
        {
            "Rating": 1139.4248492279,
            "ID": 1351,
            "ContestSlug": "weekly-contest-176"
        },
        {
            "Rating": 1132.6812943289,
            "ID": 1929,
            "ContestSlug": "weekly-contest-249"
        },
        {
            "Rating": 1129.949090232,
            "ID": 977,
            "ContestSlug": "weekly-contest-120"
        },
        {
            "Rating": 1129.3432988996,
            "ID": 1450,
            "ContestSlug": "weekly-contest-189"
        },
        {
            "Rating": 1125.575238274,
            "ID": 1455,
            "ContestSlug": "weekly-contest-190"
        },
        {
            "Rating": 1121.0677596555,
            "ID": 1464,
            "ContestSlug": "weekly-contest-191"
        },
        {
            "Rating": 1120.698183624,
            "ID": 1470,
            "ContestSlug": "weekly-contest-192"
        },
        {
            "Rating": 1118.1080334618,
            "ID": 1394,
            "ContestSlug": "weekly-contest-182"
        },
        {
            "Rating": 1104.7359028407,
            "ID": 1480,
            "ContestSlug": "weekly-contest-193"
        },
        {
            "Rating": 1084.1319467318,
            "ID": 1108,
            "ContestSlug": "weekly-contest-144"
        }
    ]

    private choiceData = [
        {
            "id": "shopee",
            "name": "Shopee精选",
            "questions": [
                341,
                1000447,
                1000446,
                1000445,
                1000444,
                1000443,
                232,
                871,
                102,
                101,
                15,
                460,
                456,
                448,
                179,
                432,
                48,
                37,
                20,
                146
            ],

        },
        {
            "id": "binary-search",
            "name": "二分查找",
            "questions": [
                4,
                1550,
                540,
                1056,
                33,
                34,
                35,
                1059,
                1060,
                1083,
                2047,
                69,
                1605,
                74,
                1612,
                1102,
                1615,
                81,
                1621,
                1122,
                611,
                1645,
                1134,
                1646,
                1143,
                633,
                1149,
                644,
                1672,
                1675,
                1679,
                658,
                1684,
                153,
                154,
                668,
                1185,
                162,
                167,
                1192,
                1730,
                718,
                719,
                1232,
                209,
                1753,
                222,
                1249,
                1766,
                745,
                1771,
                1262,
                240,
                1290,
                270,
                786,
                275,
                788,
                278,
                792,
                794,
                1307,
                287,
                802,
                1831,
                1832,
                809,
                300,
                302,
                1326,
                1851,
                1352,
                853,
                350,
                1374,
                352,
                1886,
                1891,
                1384,
                363,
                367,
                882,
                374,
                378,
                894,
                1918,
                1408,
                1413,
                1929,
                907,
                912,
                1946,
                923,
                1957,
                1966,
                947,
                436,
                1463,
                441,
                1468,
                1984,
                1476,
                1486,
                2000,
                2006,
                2018,
                2027,
                2036,
                2045,
                1023
            ],

        },
        {
            "id": "lcof",
            "name": "剑指 Offer",
            "questions": [
                1000228,
                1000229,
                1000230,
                1000231,
                1000232,
                1000233,
                1000234,
                1000235,
                1000236,
                1000237,
                1000238,
                1000239,
                1000240,
                1000241,
                1000242,
                1000243,
                1000244,
                1000245,
                1000246,
                1000247,
                1000248,
                1000249,
                1000250,
                1000251,
                1000252,
                1000253,
                1000254,
                1000255,
                1000256,
                1000257,
                1000258,
                1000259,
                1000260,
                1000261,
                1000262,
                1000263,
                1000264,
                1000265,
                1000266,
                1000267,
                1000268,
                1000269,
                1000270,
                1000271,
                1000272,
                1000273,
                1000274,
                1000275,
                1000276,
                1000277,
                1000278,
                1000279,
                1000280,
                1000281,
                1000282,
                1000283,
                1000284,
                1000285,
                1000286,
                1000287,
                1000288,
                1000289,
                1000290,
                1000291,
                1000292,
                1000293,
                1000294,
                1000295,
                1000296,
                1000297,
                1000298,
                1000299,
                1000300,
                1000301,
                1000302,
                1000303,
                1000304,
                1000305,
                1000306,
                1000307,
                1000308,
                1000309,
                1000310,
                1000311,
                1000312,
                1000313,
                1000314,
                1000315,
                1000316,
                1000317,
                1000318,
                1000319,
                1000320,
                1000321,
                1000322,
                1000323,
                1000324,
                1000325,
                1000326,
                1000327,
                1000328,
                1000329,
                1000330,
                1000331,
                1000332,
                1000333,
                1000334,
                1000335,
                1000336,
                1000337,
                1000338,
                1000339,
                1000340,
                1000341,
                1000342,
                1000343,
                1000344,
                1000345,
                1000346,
                100273,
                100274,
                100275,
                100276,
                100277,
                100278,
                100279,
                100280,
                100281,
                100282,
                100283,
                100284,
                100285,
                100286,
                100287,
                100288,
                100289,
                100290,
                100291,
                100292,
                100293,
                100294,
                100295,
                100296,
                100297,
                100298,
                100299,
                100300,
                100301,
                100302,
                100303,
                100304,
                100305,
                100306,
                100307,
                100308,
                100309,
                100310,
                100311,
                100312,
                100313,
                100314,
                100315,
                100316,
                100317,
                100318,
                100319,
                100320,
                100321,
                100322,
                100323,
                100324,
                100325,
                100326,
                100327,
                100328,
                100329,
                100330,
                100331,
                100332,
                100333,
                100334,
                100335,
                100336,
                100337,
                100338,
                100339,
                100340,
                100341,
                100342,
                100343,
                100344,
                100345,
                100346,
                100347
            ],

        },
        {
            "id": "e8X3pBZi",
            "name": "剑指 Offer（专项突击版）",
            "questions": [
                1000228,
                1000229,
                1000230,
                1000231,
                1000232,
                1000233,
                1000234,
                1000235,
                1000236,
                1000237,
                1000238,
                1000239,
                1000240,
                1000241,
                1000242,
                1000243,
                1000244,
                1000245,
                1000246,
                1000247,
                1000248,
                1000249,
                1000250,
                1000251,
                1000252,
                1000253,
                1000254,
                1000255,
                1000256,
                1000257,
                1000258,
                1000259,
                1000260,
                1000261,
                1000262,
                1000263,
                1000264,
                1000265,
                1000266,
                1000267,
                1000268,
                1000269,
                1000270,
                1000271,
                1000272,
                1000273,
                1000274,
                1000275,
                1000276,
                1000277,
                1000278,
                1000279,
                1000280,
                1000281,
                1000282,
                1000283,
                1000284,
                1000285,
                1000286,
                1000287,
                1000288,
                1000289,
                1000290,
                1000291,
                1000292,
                1000293,
                1000294,
                1000295,
                1000296,
                1000297,
                1000298,
                1000299,
                1000300,
                1000301,
                1000302,
                1000303,
                1000304,
                1000305,
                1000306,
                1000307,
                1000308,
                1000309,
                1000310,
                1000311,
                1000312,
                1000313,
                1000314,
                1000315,
                1000316,
                1000317,
                1000318,
                1000319,
                1000320,
                1000321,
                1000322,
                1000323,
                1000324,
                1000325,
                1000326,
                1000327,
                1000328,
                1000329,
                1000330,
                1000331,
                1000332,
                1000333,
                1000334,
                1000335,
                1000336,
                1000337,
                1000338,
                1000339,
                1000340,
                1000341,
                1000342,
                1000343,
                1000344,
                1000345,
                1000346
            ],

        },
        {
            "id": "xb9nqhhg",
            "name": "剑指 Offer（第 2 版）",
            "questions": [
                100319,
                100328,
                100327,
                100326,
                100325,
                100324,
                100323,
                100322,
                100321,
                100320,
                100329,
                100318,
                100317,
                100316,
                100315,
                100314,
                100313,
                100312,
                100311,
                100338,
                100347,
                100346,
                100345,
                100344,
                100343,
                100342,
                100341,
                100340,
                100339,
                100310,
                100337,
                100336,
                100335,
                100334,
                100333,
                100332,
                100331,
                100330,
                100282,
                100291,
                100290,
                100289,
                100288,
                100287,
                100286,
                100285,
                100284,
                100283,
                100292,
                100281,
                100280,
                100279,
                100278,
                100277,
                100276,
                100275,
                100274,
                100301,
                100309,
                100308,
                100307,
                100306,
                100305,
                100304,
                100303,
                100302,
                100273,
                100300,
                100299,
                100298,
                100297,
                100296,
                100295,
                100294,
                100293
            ],

        },
        {
            "id": "lccup",
            "name": "力扣杯竞赛真题集",
            "questions": [
                1000134,
                1000222,
                1000362,
                1000367,
                1000368,
                1000369,
                1000370,
                1000371,
                1000373,
                1000374,
                1000375,
                1000130,
                1000131,
                1000132,
                1000133,
                100094,
                1000138,
                1000139,
                1000140,
                1000146,
                1000147,
                1000056,
                1000057,
                1000058,
                1000059,
                100092,
                100093,
                1000062,
                1000063,
                1000218,
                100107,
                1000085,
                1000086,
                1000087,
                1000088,
                1000089,
                1000090,
                1000091,
                1052,
                1053,
                1000093,
                1000215,
                1000216,
                100096,
                1058,
                1059,
                1060,
                1061,
                1000219,
                1000220,
                1000223,
                1000224,
                1000221,
                1000359,
                1000361,
                813,
                1069
            ],

        },
        {
            "id": "dynamic-programming",
            "name": "动态规划",
            "questions": [
                1025,
                514,
                516,
                5,
                518,
                10,
                526,
                1042,
                1559,
                1051,
                32,
                1057,
                546,
                1571,
                1060,
                549,
                39,
                40,
                1063,
                42,
                1067,
                1068,
                45,
                1583,
                562,
                53,
                55,
                568,
                62,
                63,
                64,
                576,
                70,
                72,
                1105,
                1617,
                600,
                91,
                96,
                1129,
                1130,
                1134,
                115,
                118,
                119,
                120,
                121,
                122,
                123,
                124,
                634,
                1669,
                646,
                647,
                650,
                139,
                140,
                651,
                1166,
                1680,
                1170,
                152,
                664,
                1178,
                1690,
                673,
                1196,
                174,
                688,
                1201,
                1202,
                691,
                698,
                188,
                1213,
                1220,
                198,
                712,
                714,
                1228,
                1744,
                1236,
                213,
                727,
                1240,
                1242,
                221,
                1758,
                1250,
                740,
                741,
                747,
                238,
                751,
                1263,
                1789,
                254,
                256,
                1286,
                264,
                265,
                1296,
                279,
                1822,
                1828,
                294,
                298,
                300,
                304,
                309,
                312,
                1851,
                322,
                1352,
                329,
                333,
                337,
                1361,
                343,
                351,
                867,
                1893,
                361,
                877,
                368,
                1906,
                1398,
                376,
                377,
                1402,
                1403,
                896,
                1924,
                392,
                911,
                923,
                413,
                1437,
                416,
                418,
                930,
                938,
                435,
                954,
                446,
                1471,
                1474,
                452,
                1989,
                967,
                1996,
                464,
                977,
                471,
                486,
                487,
                494,
                2031,
                1008,
                1522,
                1013,
                1017,
                1531,
                1022,
                1535
            ],

        },
        {
            "id": "tusmiple",
            "name": "图森未来",
            "questions": [
                718,
                127,
                1005,
                1000428,
                1000427,
                1000426,
                1000425,
                1000424,
                1000423,
                726,
                522,
                973,
                1217,
                193,
                1972,
                171,
                1957,
                36,
                27,
                1294
            ],

        },
        {
            "id": "graph",
            "name": "图论",
            "questions": [
                317,
                1912,
                1389,
                877,
                365,
                871,
                869,
                1380,
                352,
                863,
                323,
                895,
                310,
                820,
                305,
                1325,
                813,
                803,
                801,
                1309,
                1308,
                794,
                1986,
                505,
                2040,
                2038,
                2035,
                499,
                490,
                1492,
                1485,
                971,
                964,
                1815,
                960,
                949,
                433,
                1456,
                1447,
                1442,
                417,
                922,
                1428,
                1100,
                1191,
                1701,
                1696,
                1171,
                127,
                1661,
                1144,
                1117,
                1613,
                1101,
                1706,
                1085,
                1587,
                1073,
                1576,
                547,
                1058,
                542,
                1558,
                1039,
                721,
                1300,
                269,
                261,
                753,
                744,
                737,
                1757,
                733,
                1753,
                210,
                1032,
                207,
                1229,
                1738,
                200,
                1223,
                695,
                694,
                685,
                684
            ],

        },
        {
            "id": "bytedancecampus",
            "name": "字节校园",
            "questions": [
                69,
                88,
                215,
                206,
                76,
                200,
                72,
                199,
                198,
                92,
                322,
                64,
                56,
                54,
                53,
                948,
                46,
                300,
                94,
                102,
                103,
                232,
                105,
                236,
                239,
                1000185,
                1000182,
                1000183,
                1000184,
                121,
                1000186,
                1000187,
                124,
                135,
                146,
                143,
                142,
                15,
                14,
                141,
                394,
                1000188,
                20,
                7,
                129,
                5,
                4,
                3,
                2,
                1,
                128,
                21,
                22,
                23,
                151,
                25,
                152,
                792,
                923,
                31,
                160,
                33,
                415,
                41,
                42,
                43
            ],

        },
        {
            "id": "ponyai",
            "name": "小马智行 Pony.ai",
            "questions": [
                15,
                1000351,
                1000350,
                1000349,
                92,
                1000347,
                148,
                146,
                1105,
                1000352,
                909,
                173,
                1000348,
                105,
                39,
                1860,
                98,
                1441
            ],

        },
        {
            "id": "cmbchina-cc",
            "name": "招商银行信用卡",
            "questions": [
                33,
                124,
                103,
                88,
                199,
                198,
                322,
                64,
                53,
                41,
                1,
                415,
                923,
                22,
                21,
                20,
                15,
                7,
                5,
                3
            ],
        },
        {
            "id": "data-structures",
            "name": "数据结构",
            "questions": [
                1,
                2,
                5,
                1032,
                15,
                1039,
                20,
                21,
                23,
                24,
                25,
                547,
                36,
                42,
                43,
                44,
                48,
                49,
                560,
                53,
                566,
                56,
                59,
                1085,
                73,
                1609,
                75,
                82,
                83,
                84,
                1107,
                88,
                94,
                98,
                101,
                102,
                103,
                104,
                105,
                108,
                112,
                113,
                118,
                119,
                121,
                124,
                1661,
                128,
                1665,
                642,
                136,
                138,
                141,
                142,
                143,
                144,
                145,
                653,
                148,
                155,
                1693,
                160,
                1701,
                169,
                173,
                1710,
                187,
                199,
                203,
                206,
                208,
                1745,
                211,
                212,
                214,
                215,
                217,
                218,
                729,
                226,
                739,
                230,
                232,
                235,
                236,
                238,
                1774,
                240,
                242,
                761,
                253,
                766,
                768,
                261,
                783,
                784,
                281,
                290,
                803,
                295,
                297,
                305,
                817,
                1345,
                323,
                325,
                838,
                334,
                336,
                337,
                347,
                1371,
                350,
                358,
                871,
                366,
                1903,
                369,
                378,
                892,
                383,
                387,
                394,
                402,
                409,
                922,
                415,
                1951,
                1442,
                1450,
                435,
                448,
                450,
                451,
                452,
                454,
                456,
                2009,
                1008,
                1014
            ],

        },
        {
            "id": "xb9lfcwi",
            "name": "程序员面试金典（第 6 版）",
            "questions": [
                100352,
                100353,
                100354,
                100355,
                100356,
                1000003,
                1000004,
                1000005,
                1000006,
                1000007,
                1000008,
                1000009,
                1000010,
                1000011,
                1000012,
                1000013,
                1000015,
                1000016,
                1000017,
                1000018,
                1000019,
                1000020,
                1000021,
                1000022,
                1000023,
                1000024,
                1000025,
                1000026,
                1000027,
                1000028,
                1000029,
                1000030,
                1000031,
                1000032,
                1000033,
                1000034,
                1000035,
                1000036,
                1000037,
                1000038,
                1000039,
                1000040,
                1000041,
                1000042,
                1000043,
                1000044,
                1000045,
                1000046,
                1000047,
                1000048,
                1000049,
                1000050,
                1000051,
                100158,
                100159,
                100160,
                100161,
                100162,
                100163,
                100164,
                100167,
                100168,
                100169,
                100170,
                100171,
                100172,
                100173,
                100174,
                100175,
                100176,
                100177,
                100178,
                100179,
                100180,
                100181,
                100182,
                100183,
                100184,
                100185,
                100186,
                100187,
                100188,
                100195,
                100196,
                100197,
                100198,
                100199,
                100200,
                100201,
                100202,
                100203,
                100228,
                100229,
                100230,
                100231,
                100232,
                100233,
                100240,
                100241,
                100242,
                100258,
                100259,
                100260,
                100261,
                100262,
                100348,
                100349,
                100350,
                100351
            ],

        },
        {
            "id": "algorithms",
            "name": "算法",
            "questions": [
                1025,
                3,
                4,
                5,
                1028,
                10,
                11,
                1036,
                1037,
                15,
                17,
                19,
                21,
                22,
                1046,
                542,
                33,
                34,
                35,
                547,
                37,
                1059,
                39,
                40,
                42,
                45,
                46,
                47,
                557,
                51,
                53,
                55,
                567,
                2047,
                572,
                62,
                70,
                582,
                72,
                583,
                74,
                1609,
                76,
                77,
                78,
                79,
                1101,
                82,
                85,
                90,
                91,
                617,
                1134,
                116,
                117,
                120,
                123,
                130,
                131,
                132,
                136,
                139,
                1165,
                146,
                1171,
                149,
                153,
                159,
                673,
                162,
                167,
                1192,
                174,
                695,
                189,
                190,
                191,
                198,
                200,
                201,
                202,
                713,
                714,
                715,
                206,
                207,
                209,
                210,
                213,
                221,
                733,
                1250,
                231,
                239,
                241,
                753,
                254,
                260,
                269,
                1300,
                278,
                792,
                283,
                286,
                287,
                800,
                300,
                301,
                813,
                309,
                310,
                315,
                322,
                329,
                337,
                340,
                343,
                344,
                865,
                874,
                893,
                895,
                384,
                394,
                908,
                410,
                413,
                416,
                417,
                1442,
                438,
                460,
                1485,
                2019,
                486,
                1512,
                1019,
                1023
            ],

        },
        {
            "id": "programming-skills",
            "name": "编程能力",
            "questions": [
                2,
                1031,
                8,
                525,
                23,
                535,
                28,
                43,
                556,
                48,
                49,
                1584,
                54,
                566,
                58,
                61,
                65,
                66,
                67,
                1626,
                1630,
                1125,
                104,
                110,
                631,
                635,
                642,
                138,
                1677,
                143,
                146,
                148,
                150,
                1176,
                155,
                1693,
                1708,
                173,
                1713,
                191,
                1728,
                1729,
                1736,
                713,
                202,
                715,
                208,
                209,
                211,
                214,
                1752,
                217,
                729,
                224,
                227,
                739,
                742,
                232,
                1768,
                1774,
                241,
                242,
                244,
                758,
                251,
                764,
                255,
                1791,
                771,
                1797,
                775,
                785,
                2322,
                281,
                282,
                283,
                295,
                297,
                303,
                304,
                307,
                325,
                838,
                1349,
                850,
                341,
                859,
                348,
                860,
                1888,
                353,
                1894,
                369,
                1905,
                885,
                890,
                1915,
                380,
                381,
                1406,
                1411,
                389,
                1930,
                908,
                404,
                1434,
                1949,
                1950,
                931,
                932,
                1955,
                937,
                946,
                1458,
                438,
                445,
                1982,
                449,
                1477,
                459,
                460,
                1484,
                1492,
                990,
                2015,
                1512,
                496,
                1014,
                503,
                1018
            ],

        },
        {
            "id": "meituan",
            "name": "美团真题",
            "questions": [
                1000192,
                1000193,
                1000194,
                1000195,
                1000196,
                1000197,
                1000198,
                1000199,
                1000200,
                1000201,
                1000202,
                1000203,
                1000189,
                1000190,
                1000191,
                257,
                100158,
                13,
                455,
                45,
                200,
                143,
                139,
                19,
                100344,
                162,
                177,
                75,
                1036,
                71,
                475,
                42,
                51,
                440,
                25
            ],

        },
        {
            "id": "ke",
            "name": "贝壳找房",
            "questions": [
                30,
                120,
                113,
                85,
                82,
                209,
                200,
                315,
                56,
                53,
                43,
                2,
                152,
                20,
                19,
                17,
                15,
                14,
                264,
                135,
                4
            ],

        },
        {
            "id": "efficient-winning",
            "name": "高效制胜",
            "questions": [
                230,
                329,
                79,
                720,
                218,
                1120,
                97,
                483,
                1508,
                456,
                112,
                496,
                1008,
                1013,
                119,
                121,
                122,
                416,
                3,
                11,
                524,
                15,
                18,
                20,
                279,
                28,
                1,
                803,
                167,
                42,
                53,
                825,
                322,
                70
            ],

        },
        {
            "id": "2cktkvj",
            "name": "LeetCode 热题 HOT 100",
            "questions": [
                160,
                236,
                234,
                739,
                226,
                221,
                215,
                208,
                207,
                206,
                200,
                198,
                169,
                238,
                155,
                152,
                148,
                146,
                142,
                141,
                139,
                136,
                647,
                128,
                124,
                322,
                494,
                461,
                448,
                438,
                437,
                416,
                406,
                399,
                394,
                347,
                338,
                337,
                121,
                312,
                309,
                301,
                300,
                297,
                287,
                283,
                279,
                253,
                240,
                239,
                22,
                49,
                48,
                46,
                42,
                39,
                543,
                34,
                33,
                32,
                31,
                538,
                23,
                560,
                21,
                20,
                19,
                17,
                15,
                11,
                10,
                5,
                4,
                3,
                2,
                79,
                114,
                621,
                617,
                105,
                104,
                102,
                101,
                98,
                96,
                94,
                85,
                84,
                1,
                78,
                76,
                75,
                72,
                70,
                581,
                64,
                62,
                56,
                55,
                53
            ],

        },
        {
            "id": "7cyqwuv",
            "name": "力扣杯 - 竞赛合集",
            "questions": [
                1000134,
                1000222,
                1000362,
                1000367,
                1000368,
                1000369,
                1000370,
                1000371,
                1000373,
                1000374,
                1000375,
                1000130,
                1000131,
                1000132,
                1000133,
                100094,
                1000138,
                1000139,
                1000140,
                1000146,
                1000147,
                1000056,
                1000057,
                1000058,
                1000059,
                100092,
                100093,
                1000062,
                1000063,
                1000216,
                100107,
                511,
                1000085,
                1000086,
                1000087,
                1000088,
                1000089,
                1000090,
                1000091,
                1052,
                1053,
                1000093,
                1000215,
                100096,
                1000218,
                1058,
                1059,
                1060,
                1061,
                1000219,
                1000220,
                1000223,
                1000224,
                1000221,
                1000359,
                1000361,
                1069
            ],

        },
        {
            "id": "ex0k24j",
            "name": "腾讯精选练习 50 题",
            "questions": [
                217,
                46,
                53,
                54,
                59,
                61,
                62,
                70,
                78,
                206,
                215,
                88,
                89,
                557,
                344,
                230,
                231,
                104,
                235,
                236,
                237,
                238,
                121,
                122,
                124,
                146,
                4,
                5,
                7,
                8,
                9,
                136,
                11,
                141,
                14,
                15,
                16,
                142,
                2,
                20,
                21,
                148,
                23,
                26,
                155,
                160,
                33,
                292,
                169,
                43
            ],

        },
        {
            "id": "2ckc81c",
            "name": "LeetCode 精选 TOP 面试题",
            "questions": [
                1,
                2,
                3,
                4,
                5,
                7,
                8,
                10,
                11,
                13,
                14,
                15,
                17,
                19,
                20,
                21,
                22,
                23,
                26,
                28,
                29,
                33,
                34,
                36,
                38,
                41,
                42,
                44,
                46,
                48,
                49,
                50,
                53,
                54,
                55,
                56,
                62,
                66,
                69,
                70,
                73,
                75,
                76,
                78,
                79,
                84,
                88,
                91,
                94,
                98,
                101,
                102,
                103,
                104,
                105,
                108,
                116,
                118,
                121,
                122,
                124,
                125,
                127,
                128,
                130,
                131,
                134,
                136,
                138,
                139,
                140,
                141,
                146,
                148,
                149,
                150,
                152,
                155,
                160,
                162,
                163,
                166,
                169,
                171,
                172,
                179,
                189,
                190,
                191,
                198,
                200,
                202,
                204,
                206,
                207,
                208,
                210,
                212,
                215,
                217,
                218,
                227,
                230,
                234,
                236,
                237,
                238,
                239,
                240,
                242,
                251,
                253,
                268,
                269,
                277,
                279,
                283,
                285,
                287,
                289,
                295,
                297,
                300,
                308,
                315,
                322,
                324,
                326,
                328,
                329,
                334,
                340,
                341,
                344,
                347,
                348,
                350,
                371,
                378,
                380,
                384,
                387,
                395,
                412,
                454
            ],

        }
    ]


    public getChoiceData() {
        return this.choiceData
    }

    public getScoreData(): Map<string, IScoreData> {

        let nameSiteMapping = new Map<string, IScoreData>();
        const temp = this.scoreBase as IScoreData[]
        temp.forEach(element => {
            // Rating
            // ID
            // ContestSlug
            element.score = "" + Math.floor(element.Rating || 0);
            nameSiteMapping.set("" + element.ID, element)
        });
        return nameSiteMapping
    }
}

export const resourcesData: ResourcesData = new ResourcesData();
