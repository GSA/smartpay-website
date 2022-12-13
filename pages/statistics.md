---
title: Statistics
layout: layouts/page
permalink: /statistics/
excerpt: Data about cardholder use
sidenav: true
link-title: The GSA SmartPay Program
links:
  - text: Program Statistics Overview
    url: null
  - text: Sales, Transactions, Account Holder Data
    url: null
  - text: GSA SmartPay Refunds
    url: null
  - text: Interesting Data Metrics
    url: null
  - text: Travel Card Spend in the U.S. by Region
    url: null
  - text: CFO Reports
    url: null
  - text: GSA SmartPay Savings Calculator
    url: null
  - text: Top Vendor Reports
    url: null
  - text: GSA SmartPay Purchase Card Statistics reports for FPDS
    url: null
  - text: GSA SmartPay Socioeconomic Statistics Reports
    url: null            
---

## Vega charts demo

```vegalite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A simple bar chart with embedded data.",
  "width": 400,
  "height": 200,
  "data": {"url": "data/seattle-weather.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "timeUnit": "month",
      "field": "date",
      "type": "ordinal",
      "title": "Month of the year"
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    },
    "color": {
      "field": "weather",
      "type": "nominal",
      "scale": {
        "domain": ["sun", "fog", "drizzle", "rain", "snow"],
        "range": ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"]
      },
      "title": "Weather type"
    }
  }
}
```
