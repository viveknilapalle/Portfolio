---
title: Zepto Product Analytics
summary: End-to-end SQL analysis of Zepto's product inventory — pricing, discounts, stock availability and category revenue potential.
category: SQL Analytics
technologies: [SQL, MySQL, MySQL Workbench, CTEs, Window Functions]
image: /images/projects/zepto-product-analytics/cover.png
imageAlt: MySQL Workbench result grid listing the most premium product in each Zepto category
github: https://github.com/viveknilapalle/Zepto_SQL_Analytics
featured: true
order: 2
status: Completed
date: 2026-06
dataset: Zepto product inventory (3,727 products)
highlights:
  - value: "3,727"
    label: products analysed
  - value: "14"
    label: categories
  - value: "28.57%"
    label: highest stockout rate (Biscuits)
  - value: "15.46%"
    label: top avg. discount (Fruits & Veg)
problem: >-
  Zepto manages thousands of products across many categories. Understanding pricing patterns, discount effectiveness,
  stock availability and revenue potential is critical for optimising inventory, reducing stockouts, improving
  pricing and identifying high-value categories.
approach: >-
  A complete SQL analytics workflow in MySQL: build the schema, clean and validate the data, explore it category by
  category, then answer the business questions with advanced SQL — CTEs, window and ranking functions, and CASE
  expressions.
workflow:
  - title: Database setup
    detail: Create schema and import the inventory CSV
  - title: Data cleaning
    detail: Nulls, duplicates, invalid prices, category standardisation
  - title: Exploration
    detail: Portfolio, pricing, discounts, inventory, stock
  - title: Advanced SQL
    detail: CTEs, window functions, ranking within categories
  - title: Insights
    detail: Business recommendations per category
outcome: >-
  A set of reproducible SQL scripts and a findings report that translate raw inventory rows into concrete
  recommendations on replenishment, discounting and where to focus inventory investment.
findings:
  - Cooking Essentials and Munchies have the most products (512 each) and the highest revenue potential (₹337,131 each).
  - Fruits & Vegetables offers the highest average discount at 15.46%; the single highest product discount is 51%.
  - Biscuits recorded the highest stockout rate at 28.57%.
  - The most expensive product is the Borges Extra Light Olive Oil Bottle at an MRP of ₹2,600.
gallery:
  - src: /images/projects/zepto-product-analytics/revenue-potential.png
    alt: Query result ranking categories by revenue potential, led by Cooking Essentials and Munchies at 337,131
    caption: Revenue potential by category.
  - src: /images/projects/zepto-product-analytics/avg-discounts.png
    alt: Query result showing the average discount percentage for each category
    caption: Category-wise average discount.
  - src: /images/projects/zepto-product-analytics/out-of-stock.png
    alt: Query result showing out-of-stock counts by category
    caption: Out-of-stock products by category.
---

The analysis lives in four ordered SQL scripts, so the whole thing can be re-run from scratch:

| Script | Purpose |
| --- | --- |
| `01_Database_Setup.sql` | Create the database and table, import the dataset |
| `02_Data_Cleaning.sql` | Check missing values and duplicates, remove invalid price rows, standardise categories, convert stock status to numeric |
| `03_exploratory_analysis.sql` | Product portfolio, pricing, discounts, inventory and stock availability |
| `04_Business_Analysis.sql` | Revenue potential, ranking within categories, most premium product per category |

## Techniques used

- Aggregates with `GROUP BY` / `HAVING` for category roll-ups
- `CASE` expressions to bucket stock status and discounts
- Common Table Expressions to keep multi-step questions readable
- Window and ranking functions to rank products **within** each category — for example, finding the most premium product per category

## Recommendations

- **Inventory:** improve replenishment planning for high-stockout categories, especially Biscuits and dairy-related lines.
- **Pricing:** keep targeted discounting in Fruits & Vegetables, and review the profitability of heavily discounted products.
- **Revenue:** prioritise inventory investment in Cooking Essentials and Munchies, and promote premium products that drive category revenue.
