---
title: Movie Recommender System
summary: Content-based recommender that suggests the five most similar films to any title, served through an interactive Streamlit app.
category: Machine Learning
technologies: [Python, Scikit-learn, NLTK, CountVectorizer, Cosine Similarity, Pandas, NumPy, Streamlit]
image: /images/projects/movie-recommender-system/cover.png
imageAlt: Streamlit interface of the Movie Recommendation System with a movie search box and a Recommend Movies button
github: https://github.com/viveknilapalle/Movie_Recommender_System
featured: true
order: 1
status: Completed
date: 2026-07
dataset: TMDB 5000 Movies
highlights:
  - value: Top 5
    label: similar films per query
  - value: TMDB 5000
    label: movies & credits dataset
  - value: Real-time
    label: Streamlit recommendations
problem: >-
  With thousands of titles to choose from, finding "something like the movie I just watched" is surprisingly hard.
  The goal was a recommender that works from a film's own content — its genres, keywords, cast, crew and overview —
  rather than from other users' ratings.
approach: >-
  A content-based filtering approach: every movie's metadata is merged into a single text "tag", turned into a
  Bag-of-Words vector with CountVectorizer, and compared against every other movie using cosine similarity. The five
  nearest neighbours become the recommendations.
workflow:
  - title: Raw metadata
    detail: TMDB 5000 movies and credits CSVs
  - title: Preprocess
    detail: Merge fields into tags; clean and stem with NLTK
  - title: Vectorise
    detail: Bag of Words via CountVectorizer
  - title: Similarity
    detail: Cosine similarity across all movie vectors
  - title: Serve
    detail: Streamlit app returns the top 5 matches with posters
outcome: >-
  A working Streamlit application where a user picks any movie from the dataset and instantly gets five content-similar
  recommendations, with posters fetched from the TMDB API.
nextSteps:
  - Genre and language filters
  - A hybrid recommender that blends content and collaborative signals
  - Personalised recommendations
gallery:
  - src: /images/projects/movie-recommender-system/shot-2.png
    alt: Recommendations for Spider-Man showing five posters including Spider-Man 3 and The Amazing Spider-Man 2
    caption: Searching "Spider-Man" returns its sequels and thematically close titles.
  - src: /images/projects/movie-recommender-system/shot-3.png
    alt: Recommendations for The Conjuring showing horror films such as Insidious and Ouija
    caption: Genre and keyword overlap drives horror picks for "The Conjuring".
  - src: /images/projects/movie-recommender-system/shot-1.png
    alt: Recommendations for Avatar showing science-fiction films such as Aliens and Titan A.E.
    caption: Sci-fi metadata surfaces "Aliens" and "Titan A.E." for "Avatar".
---

The project is split into two notebooks and a small app:

- **`data_preprocessing.ipynb`** merges the TMDB movies and credits files and combines the metadata into a single
  `tags` column. Text is cleaned and stemmed with NLTK so that variants such as *love*, *loving* and *loved*
  collapse to one token.
- **`model.ipynb`** vectorises the tags with `CountVectorizer`, computes a cosine-similarity matrix, and serialises
  the results with Pickle.
- **`app.py`** loads the pickled artefacts into a Streamlit interface. Selecting a title looks up its row in the
  similarity matrix, sorts by score and returns the five closest movies.

## How a recommendation is produced

1. Movie metadata is preprocessed and combined into tags.
2. `CountVectorizer` converts the tags into numerical vectors.
3. Cosine similarity measures how close each pair of movie vectors is.
4. For the selected movie, the five highest-scoring neighbours are returned.
