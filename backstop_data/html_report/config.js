report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png",
        "test": "../bitmaps_test/20210824-152607/backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png",
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
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "3.43",
          "analysisTime": 34
        },
        "diffImage": "../bitmaps_test/20210824-152607/failed_diff_backstop_default_clubmigros-kulturprozent-classicsch_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png",
        "test": "../bitmaps_test/20210824-152607/backstop_default_clubmigros-kulturprozent-classicsch_0_document_1_desktop.png",
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
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_0_phone.png",
        "test": "../bitmaps_test/20210824-152607/backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_0_phone.png",
        "label": "migros-kulturprozent-classics.ch newsletter",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/Newsletter.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_1_desktop.png",
        "test": "../bitmaps_test/20210824-152607/backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_1_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_migros-kulturprozent-classicsch_newsletter_0_document_1_desktop.png",
        "label": "migros-kulturprozent-classics.ch newsletter",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:4200/src/es/components/pages/Newsletter.html",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});