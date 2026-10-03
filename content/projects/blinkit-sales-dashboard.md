---
title: Blinkit Sales Analytics Dashboard
summary: Interactive Power BI dashboard analysing Blinkit's grocery sales across item types, outlet sizes, location tiers and establishment years.
category: Business Intelligence
technologies: [Power BI, DAX, Excel]
image: /images/projects/blinkit-sales-dashboard/cover.png
imageAlt: Blinkit Power BI dashboard with KPI cards, item type bar chart, fat content donut and outlet size pie chart
github: https://github.com/viveknilapalle/Blinkit_Sales_Analytics_Dashboard
featured: true
order: 3
status: Completed
date: 2026-08
dataset: Blinkit grocery data (8,523 records)
highlights:
  - value: "8,523"
    label: sales records
  - value: "219.87K"
    label: total sales visualised
  - value: "4.35"
    label: average rating
  - value: "3"
    label: interactive slicers
problem: >-
  Raw grocery sales data doesn't tell a manager which categories, outlet sizes or location tiers are actually driving
  revenue. The aim was a single report page that answers those questions at a glance and lets users drill in.
approach: >-
  Import the Blinkit dataset into Power BI, model it, and build DAX measures for the headline KPIs so every card and
  chart recalculates when filters change. Visuals are grouped by question — what sells, where, and how it has trended.
workflow:
  - title: Dataset
    detail: Blinkit grocery data in Excel
  - title: Data model
    detail: Import and model in Power BI Desktop
  - title: DAX measures
    detail: Total sales, items sold, average rating, average sales
  - title: Visuals
    detail: KPI cards, bar, donut, pie and line charts
  - title: Interactivity
    detail: Slicers for item type, outlet size and location
outcome: >-
  A one-page interactive dashboard that combines high-level KPIs with detailed breakdowns, styled after the Blinkit
  brand, where every number responds to the selected filters.
findings:
  - Snack Foods and Fruits & Vegetables are the highest-selling item categories.
  - Tier 3 outlets contribute the most sales of the three location tiers.
  - Medium-sized outlets contribute the largest share of sales by outlet size.
gallery:
  - src: /images/projects/blinkit-sales-dashboard/kpis.png
    alt: KPI cards showing average sales 141.03, average rating 4.35, total sales 219.87K and items sold 2K
    caption: KPI cards driven by DAX measures.
  - src: /images/projects/blinkit-sales-dashboard/visual-2.png
    alt: Charts for item fat content, sales by outlet size, sales by outlet location tier and sales by establishment year
    caption: Breakdowns by fat content, outlet size, location tier and establishment year.
  - src: /images/projects/blinkit-sales-dashboard/filters.png
    alt: Slicer panel with outlet location type, item type and item fat content filters
    caption: Slicers that filter every visual on the page.
---

The dashboard answers a fixed set of business questions, each mapped to a visual:

| Question | Visual |
| --- | --- |
| Total sales, items sold, average rating, average sales | KPI cards (DAX measures) |
| Which item categories contribute most? | Horizontal bar chart by item type |
| How do Low Fat and Regular items compare? | Donut chart, plus a bar chart split by location tier |
| Which outlet size sells the most? | Pie chart by outlet size |
| Which location tier generates the most sales? | Bar visual by outlet location type |
| How have sales changed with outlet age? | Line chart by establishment year |

## Why measures instead of fixed values

KPIs are calculated with DAX measures rather than hard-coded numbers, so the whole page updates dynamically when a
user applies a slicer — the same report works for "all outlets" and for a single tier or item type.
