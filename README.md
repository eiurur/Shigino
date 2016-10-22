Chika
======

【WIP】 Twitter Moment Aggregator

![demo](https://github.com/eiurur/Chika/raw/master/demo.png)

# Usage

    npm i
    npm run dev

# API

### `/api/tweets/moments`

**parameters**

- word
- skip
- limit

**Ex**

    http://chika.eiurur.xyz/api/tweets/moments?limit=30&skip=0&word=%E8%89%A6%E3%81%93%E3%82%8C

**Output**

    λ curl "http://chika.eiurur.xyz/api/tweets/moments?limit=1&word=%E3%81%94%E3%81%A1%E3%81%86%E3%81%95" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   593  100   593    0     0   6860      0 --:--:-- --:--:-- --:--:--  7059
    {
        "count": 7,
        "moments": [
            {
                "__v": 0,
                "_id": "57f0d1a1ebc91de524c7d28b",
                "avater": "https://pbs.twimg.com/profile_images/782582933525704705/OhE_gxn4_mini.jpg",
                "count": 53,
                "created_at": "2016-10-09T09:36:26.594Z",
                "description": "\n        \u3054\u3061\u3046\u3055\u7d75\u307e\u3068\u30fc\u30e1\u30f3\u30c8\n      ",
                "expanded_url": "https://twitter.com/i/moments/782437849249435648",
                "fullname": "\u3074\u308a\u3077\u3093",
                "moment_id": "782437849249435648",
                "thumbnail": "https://pbs.twimg.com/media/CtvHPu6UAAA0lLb.jpg",
                "title": "\n          \u30e2\u30fc\u30e1\u30f3\u30c8\u300c\u3054\u3061\u3046\u3055\u306e\u5149\u300d\n\n      ",
                "updated_at": "2016-10-03T15:23:43.650Z",
                "username": "piripunpun"
            }
        ]
    }


### `/api/tweets/moments/@:username`

**parameters**

- skip
- limit

**Ex**

    http://chika.eiurur.xyz/api/tweets/moments/@tiv_

**Output**

    λ curl "http://chika.eiurur.xyz/api/tweets/moments/@tiv_" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  1756  100  1756    0     0  27927      0 --:--:-- --:--:-- --:--:-- 29266
    {
        "count": 3,
        "moments": [
            {
                "__v": 0,
                "_id": "57f3a911ebc91de524c7de04",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 47,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u6614\u306e\u753b\u50cf\u3067\u3059\u3051\u3069\u7fbd\u3064\u304d\u306e\u5973\u306e\u5b50\u307e\u3068\u3081\u3066\u307f\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/783290594982449153",
                "fullname": "Tiv",
                "moment_id": "783290594982449153",
                "thumbnail": "https://pbs.twimg.com/media/BoCzqmrIUAEMWEc.png",
                "title": "\n          \u5929\u4f7f\u306e\u65e5\u306a\u306e\u3067\n\n      ",
                "updated_at": "2016-10-04T16:36:06.449Z",
                "username": "tiv_"
            },
            {
                "__v": 0,
                "_id": "57f0efc5ebc91de524c7d38e",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 16,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u30a4\u30e9\u30b9\u30c8\u3092\u4e00\u90e8\u307e\u3068\u3081\u3066\u307f\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/782389285395718144",
                "fullname": "Tiv",
                "moment_id": "782389285395718144",
                "thumbnail": "https://pbs.twimg.com/media/CWW6GbGVAAAU_FA.png",
                "title": "\n          \u30a4\u30e9\u30b9\u30c8\u307e\u3068\u3081\n\n      ",
                "updated_at": "2016-10-08T13:35:17.271Z",
                "username": "tiv_"
            },
            {
                "__v": 0,
                "_id": "57f0d35eebc91de524c7d2b9",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 7,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u9023\u8f09\u521d\u671f\u304b\u3089\u4eca\u307e\u3067\u306e\u753b\u50cf\u3092\u4e00\u90e8\u307e\u3068\u3081\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/782381521164378118",
                "fullname": "Tiv",
                "moment_id": "782381521164378118",
                "thumbnail": "https://pbs.twimg.com/media/B-2Ur1MVIAIcpTD.png",
                "title": "\n          \u653f\u5b97\u304f\u3093\u306e\u30ea\u30d9\u30f3\u30b8\u95a2\u9023\u30a4\u30e1\u30fc\u30b8\n\n      ",
                "updated_at": "2016-10-04T16:40:15.594Z",
                "username": "tiv_"
            }
        ]
    }

### `/api/tweets/moments/ranking/:term`

**parameters**

- skip
- limit
- term
-- `day` or `week` or `month` or `year`

**Ex**

    curl "http://chika.eiurur.xyz/api/tweets/moments/ranking/month" | python -mjson.tool

**Output**

    λ  curl "http://chika.eiurur.xyz/api/tweets/moments/ranking/month?limit=3" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  1953  100  1953    0     0  17597      0 --:--:-- --:--:-- --:--:-- 17917
    {
        "count": 29,
        "moments": [
            {
                "__v": 0,
                "_id": "57f128cfebc91de524c7d7d6",
                "avater": "https://pbs.twimg.com/profile_images/789828265078759425/GBKp33aj_mini.jpg",
                "count": 162,
                "created_at": "2016-10-22T18:41:06.156Z",
                "description": "\n        \u307e\u3068\u3081\u307e\u3057\u305f\n      ",
                "expanded_url": "https://twitter.com/i/moments/782579041547063296",
                "fullname": "\u00a0\ud83c\udf59\u00a0\u27b0\u00a0\u27b0\u00a0\ud83d\udca5\u00a0\ud83d\udc13\u68b5\u8f9b",
                "moment_id": "782579041547063296",
                "thumbnail": "https://pbs.twimg.com/media/CtxHmPtUAAAVhTE.jpg",
                "title": "\n          \u30ac\u30eb\u30d1\u30f3\u7d75\u3068\u6f2b\u753b\n\n      ",
                "tweeted_at": "2016-10-02T15:00:00.000Z",
                "updated_at": "2016-10-22T18:33:42.834Z",
                "username": "sokusekimaou"
            },
            {
                "__v": 0,
                "_id": "57f10f4eebc91de524c7d622",
                "avater": "https://pbs.twimg.com/profile_images/769916841607122945/k2bRRTVp_mini.jpg",
                "count": 124,
                "created_at": "2016-10-22T18:41:06.156Z",
                "description": "\n        \u79c1\u304c18\u6b73\u306b\u306a\u3063\u305f\u3070\u304b\u308a\u306e\u6642\u306b\u7236\u304b\u3089\u3055\u308c\u305f\u544a\u767d\u3001\u305b\u3063\u304b\u304f\u3060\u304b\u3089\u30de\u30f3\u30ac\u306b\u3057\u3066\u8a18\u9332\u3057\u3066\u304a\u3053\u3046\u3068\u601d\u3046\u3002\u3082\u3046\u307f\u3093\u306a\u306b\u8a00\u3063\u3066\u3082\u3044\u3044\u3088\u306d\uff01\n      ",
                "expanded_url": "https://twitter.com/i/moments/782575885308178432",
                "fullname": "\u30c8\u30df\u30e0\u30e9\u30b3\u30bf",
                "moment_id": "782575885308178432",
                "thumbnail": "https://pbs.twimg.com/media/CtxE4gnUsAE3e4P.jpg",
                "title": "\n          \u7236\u89aa\u304b\u3089\u306e\u307e\u3055\u304b\u306e\u544a\u767d\n\n
      ",
                "tweeted_at": "2016-10-01T15:00:00.000Z",
                "updated_at": "2016-10-22T18:22:57.076Z",
                "username": "cota0572"
            },
            {
                "__v": 0,
                "_id": "57f0d370ebc91de524c7d2bc",
                "avater": "https://pbs.twimg.com/profile_images/778857756681830401/NGV8WRCn_mini.jpg",
                "count": 11,
                "created_at": "2016-10-22T18:41:06.156Z",
                "description": "\n        \u52d5\u304b\u3057\u305f\u3084\u3064\n      ",
                "expanded_url": "https://twitter.com/i/moments/782135717694550017",
                "fullname": "rariemonn@\u30b9\u30bf\u30f3\u30d7\u30ea\u30ea\u30fc\u30b9",
                "moment_id": "782135717694550017",
                "thumbnail": null,
                "title": "\n          Live2D \u52d5\u304f\u25cb\u25cb\u307e\u3068\u3081\n\n      ",
                "tweeted_at": "2016-09-30T15:00:00.000Z",
                "updated_at": "2016-10-22T18:37:48.725Z",
                "username": "rariemonn765"
            }
        ]
    }



### `/api/tweets/moments/latest`

**parameters**

- word
- skip
- limit

**Ex**

    curl "http://chika.eiurur.xyz/api/tweets/moments/latest?limit=3" | python -mjson.tool

**Output**

    λ  curl "http://chika.eiurur.xyz/api/tweets/moments/latest?limit=3" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  1697  100  1697    0     0  16130      0 --:--:-- --:--:-- --:--:-- 16475
    {
        "count": 4275,
        "moments": [
            {
                "__v": 0,
                "_id": "57f122c0ebc91de524c7d78e",
                "avater": "https://pbs.twimg.com/profile_images/672028820216504320/BfovkJv8_mini.jpg",
                "count": 1,
                "created_at": "2016-10-22T18:43:32.341Z",
                "description": "\n        \u30c6\u30b9\u30c8\n      ",
                "expanded_url": "https://twitter.com/i/moments/782597761820598272",
                "fullname": "\u3057\u3087\u3046\uff0a",
                "moment_id": "782597761820598272",
                "thumbnail": "https://pbs.twimg.com/media/CtxFg_fUMAEaic2.jpg",
                "title": "\n          \u30c6\u30b9\u30c8\n\n      ",
                "tweeted_at": "2016-10-22T18:43:32.341Z",
                "updated_at": "2016-10-02T15:07:44.360Z",
                "username": "agesho0110"
            },
            {
                "__v": 0,
                "_id": "57f232c9ebc91de524c7d841",
                "avater": "https://pbs.twimg.com/profile_images/715855936284262400/6XLd_EHy_mini.jpg",
                "count": 6,
                "created_at": "2016-10-22T18:43:32.341Z",
                "description": "\n        \u30c6\u30b9\u30c8\n      ",
                "expanded_url": "https://twitter.com/i/moments/782887996802551808",
                "fullname": "\u304b\u306a\u305f\u3059@BOFU2016#tnjp13",
                "moment_id": "782887996802551808",
                "thumbnail": "https://pbs.twimg.com/media/Ct1gRC3UsAAb6Wb.jpg",
                "title": "\n          BOFU\u53c2\u52a0\u60c5\u5831\n\n      ",
                "tweeted_at": "2016-10-22T18:43:32.341Z",
                "updated_at": "2016-10-04T16:18:28.254Z",
                "username": "KanataS"
            },
            {
                "__v": 0,
                "_id": "57f232f8ebc91de524c7d848",
                "avater": "https://pbs.twimg.com/profile_images/763345670174420992/7EGVsrYm_mini.jpg",
                "count": 45,
                "created_at": "2016-10-22T18:43:32.341Z",
                "description": "\n        \u4eca\u307e\u3067\u4f5c\u3063\u305f\u3082\u306e\n      ",
                "expanded_url": "https://twitter.com/i/moments/782866474192941056",
                "fullname": "\u30d4\u30f3\u30af\u30e9\u30c3\u30d4\u30fc",
                "moment_id": "782866474192941056",
                "thumbnail": null,
                "title": "\n          \u52d5\u753b\u307e\u3068\u3081\n\n      ",
                "tweeted_at": "2016-10-22T18:43:32.341Z",
                "updated_at": "2016-10-03T14:39:51.145Z",
                "username": "rappiship4"
            }
        ]
    }


