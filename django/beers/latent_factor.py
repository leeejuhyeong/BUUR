import pandas as pd
import numpy as np
import scipy
import pymysql
import time
from scipy.sparse.linalg import svds


def connect():
    return pymysql.connect(
        user='buur',
        passwd='buur1014!',
        host='j6b102.p.ssafy.io',
        db='buur',
        charset='utf8'
    )


def get_data(buur_db):
    # review 정보
    cursor = buur_db.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM `review`;"
    cursor.execute(sql)
    review = pd.DataFrame(cursor.fetchall())

    # beer 정보
    sql = "SELECT * FROM `beer`;"
    cursor.execute(sql)
    beer = pd.DataFrame(cursor.fetchall())

    return review, beer


def latent_factor_recommend(review):
    df_user_beer_ratings = review.pivot_table(
        'total_score', index='id', columns='beer_id').fillna(0)

    # matrix는 pivot table(df_user_beer_rating)값을 matrix로 만든 것
    matrix = df_user_beer_ratings.to_numpy()
    # user_rating_mean은 사용자의 평균 펑점
    user_rating_mean = np.mean(matrix, axis=1)
    # matrix_uesr_mean는 사용자-영화에 대해 평균평점을 뺀 값
    matrix_user_mean = matrix - user_rating_mean.reshape(-1, 1)

    print(matrix_user_mean)
    U, sigma, Vt = svds(matrix_user_mean, k=2)
    sigma = np.diag(sigma)

    # U, sigma, Vt의 내적을 수행해 다시 원본 행렬로 복원
    # + 사용자 평균 rating을 적용
    svd_user_predicted_ratings = np.dot(
        np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1, 1)

    return pd.DataFrame(
        svd_user_predicted_ratings, columns=df_user_beer_ratings.columns)


def recommend_beers(df_svd_preds, id, ori_beer_df, ori_ratings_df, num_recommendations=5):

    # userNumber를 index로 나타내기
    user_row_number = id - 1

    # 최종적으로 만든 pred_df에서 사용자 index에 따라 맥주 데이터 정렬 -> 맥주 평점이 높은 순으로 정렬
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(
        ascending=False)

    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아냄
    user_data = ori_ratings_df[ori_ratings_df.id == id]

    # user_data와 원본 beer 데이터 합치기
    user_history = user_data.merge(ori_beer_df, on='beer_id').sort_values([
        'total_score'], ascending=False)

    # 원본 리뷰 데이터에서 사용자가 마신 맥주 제거
    recommendations = ori_beer_df[~ori_beer_df['beer_id'].isin(
        user_history['beer_id'])]

    recommendations = recommendations.merge(pd.DataFrame(
        sorted_user_predictions).reset_index(), on='beer_id')

    recommendations = recommendations.rename(
        columns={user_row_number: 'Predictions'}).sort_values('Predictions', ascending=False).head(num_recommendations)

    return user_history, recommendations


def use_latent(id):
    # db 연결
    buur_db = connect()

    # 데이터 가져오기
    review, beer = get_data(buur_db)

    # 잠재 요소 기반 분석(SVD)
    df_svd_preds = latent_factor_recommend(review)

    # 추천
    alredady_rated, predictions = recommend_beers(
        df_svd_preds, id, beer, review, 10)

    return (predictions.to_dict('records'))
