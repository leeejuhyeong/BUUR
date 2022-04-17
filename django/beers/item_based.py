import pandas as pd
import pymysql
from sklearn.metrics.pairwise import cosine_similarity


def load(path):
    return pd.read_csv(path)


def processing(data, n):
    min_id = data['review_profilename'].value_counts() >= n
    min_id = min_id[min_id].index.to_list()
    data = data[data['review_profilename'].isin(min_id)]

    min_beer = data['beer_name'].value_counts() >= n
    min_beer = min_beer[min_beer].index.to_list()
    data = data[data['beer_name'].isin(min_beer)]

    return data


def get_item_based_collabor(path, beer_name):
    beer = load(path)
    beer = processing(beer, 100)

    beer_user_rating = beer.pivot_table(
        'review_overall', index='beer_name', columns='review_profilename')

    # NaN을 0으로 변환
    beer_user_rating = beer_user_rating.fillna(0)

    item_based_collabor = cosine_similarity(beer_user_rating)
    item_based_collabor = pd.DataFrame(
        data=item_based_collabor, index=beer_user_rating.index, columns=beer_user_rating.index)

    # 해당하는 맥주와 비슷한 6개 추천
    return item_based_collabor[beer_name].sort_values(ascending=False)[:10]


if __name__ == "__main__":
    buur_db = pymysql.connect(
        user='user',
        passwd='passwd',
        host='domain',
        db='buurtest',
        charset='utf8'
    )

    cursor = buur_db.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM `review`;"
    cursor.execute(sql)
    beer = cursor.fetchall()
    beer = pd.DataFrame(beer)

    # beer = load('../data/beer_reviews.csv')

    # 데이터 정제
    # temp = processing(beer, 100)
    # temp.to_csv('../data/filter_beer.csv', encoding='utf-8')

    beer_user_rating = beer.pivot_table(
        'review_rank', index='beer_no', columns='user_no')

    # NaN을 0으로 변환
    beer_user_rating = beer_user_rating.fillna(0)

    item_based_collabor = cosine_similarity(beer_user_rating)
    item_based_collabor = pd.DataFrame(
        data=item_based_collabor, index=beer_user_rating.index, columns=beer_user_rating.index)

    # 해당하는 맥주와 비슷한 6개 추천
    print(item_based_collabor[1].sort_values(
        ascending=False)[:30])
