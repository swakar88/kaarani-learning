# Kaarani Sample Dataset — Power BI Setup Guide

## Files

| File | Description | Rows |
|------|-------------|------|
| fact_activity.csv | Main fact table — all flavors combined | ~2,500 |
| dim_date.csv | Date dimension (2022–2024) | 1,096 |
| dim_entity.csv | Players/artists/products per flavor | ~50 |
| dim_category.csv | Teams/genres/departments per flavor | ~40 |
| dim_location.csv | Stadiums/platforms/stores per flavor | ~28 |
| dim_flavor.csv | Flavor lookup | 7 |

## Star Schema Relationships

```
fact_activity.date_key      → dim_date.date_key
fact_activity.entity_key    → dim_entity.entity_key
fact_activity.category_key  → dim_category.category_key
fact_activity.location_key  → dim_location.location_key
fact_activity.flavor_id     → dim_flavor.flavor_id
dim_entity.category_key     → dim_category.category_key
```

## Loading in Power BI Desktop

1. Home → Get Data → Text/CSV
2. Load each of the 5 CSV files (select "Transform Data" each time)
3. In Power Query: verify column types, Close & Apply
4. Go to Model View
5. Create relationships using the keys above
6. To filter by flavor: add a slicer on `dim_flavor[label]` or `fact_activity[flavor_id]`

## Embedding Filter

To embed a flavor-filtered report:
```
?filter=fact_activity/flavor_id eq 'baseball'
```
