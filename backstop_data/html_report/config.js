report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20210526-142919\\backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png",
        "label": "club.migros-kulturprozent-classics.ch",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/ClubConcerts.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 4
          },
          "misMatchPercentage": "7.17",
          "analysisTime": 54
        },
        "diffImage": "..\\bitmaps_test\\20210526-142919\\failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png",
        "test": "..\\bitmaps_test\\20210526-142919\\backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png",
        "label": "club.migros-kulturprozent-classics.ch",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/ClubConcerts.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.57",
          "analysisTime": 1113
        },
        "diffImage": "..\\bitmaps_test\\20210526-142919\\failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});