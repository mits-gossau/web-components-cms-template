report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_tiny.png",
        "test": "../bitmaps_test/20210330-173213/backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_tiny.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_tiny.png",
        "label": "club.migros-kulturprozent-classics.ch",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/ClubConcerts.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tiny",
        "engineErrorMsg": "Execution context was destroyed, most likely because of a navigation.",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 68,
            "height": -4286
          },
          "misMatchPercentage": "4.02",
          "analysisTime": 52
        },
        "diffImage": "../bitmaps_test/20210330-173213/failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_tiny.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_phone.png",
        "test": "../bitmaps_test/20210330-173213/backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_phone.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_phone.png",
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
            "width": -88,
            "height": -3907
          },
          "misMatchPercentage": "3.19",
          "analysisTime": 50
        },
        "diffImage": "../bitmaps_test/20210330-173213/failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_2_tablet.png",
        "test": "../bitmaps_test/20210330-173213/backstop_default_clubmigros-kulturprozent-classicsch_0_document_2_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_2_tablet.png",
        "label": "club.migros-kulturprozent-classics.ch",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/ClubConcerts.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -493
          },
          "misMatchPercentage": "0.00",
          "analysisTime": 109
        },
        "diffImage": "../bitmaps_test/20210330-173213/failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_2_tablet.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_3_desktop.png",
        "test": "../bitmaps_test/20210330-173213/backstop_default_clubmigros-kulturprozent-classicsch_0_document_3_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_clubmigros-kulturprozent-classicsch_0_document_3_desktop.png",
        "label": "club.migros-kulturprozent-classics.ch",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/ClubConcerts.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": -3608,
            "height": -10994
          },
          "misMatchPercentage": "0.10",
          "analysisTime": 822
        },
        "diffImage": "../bitmaps_test/20210330-173213/failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_3_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});