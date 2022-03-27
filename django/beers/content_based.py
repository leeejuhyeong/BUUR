from operator import index
import pandas as pd
import pymysql
import numpy as np
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
        user='buur',
        passwd='buur1014!',
        host='j6b102.p.ssafy.io',
        db='buurtest',
        charset='utf8'
    )

    cursor = buur_db.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM `beer`;"
    cursor.execute(sql)
    beer = cursor.fetchall()
    beer = pd.DataFrame(beer, columns=[
                        'beer_abv', 'beer_ibu', 'beer_category'])

    beer['beer_category'] = beer['beer_category'].map(
        {'ALE': 1, 'LAGER': 2, 'BLACK_BEER': 3, 'PILSNER': 4, 'WHEAT_BEER': 5, 'ETC': 6, '': 0})
    # beer = load('../data/beer_reviews.csv')

    item_based_collabor = cosine_similarity(beer)
    print(item_based_collabor.shape)
    item_based_collabor = pd.DataFrame(
        data=item_based_collabor, index=beer.index)
    # 해당하는 맥주와 비슷한 6개 추천
    # print(item_based_collabor[0].sort_values(
    #     ascending=False)[:10])
    # print(item_based_collabor.shape)

    db = pymysql.connect(
        user='buur',
        passwd='buur1014!',
        host='j6b102.p.ssafy.io',
        db='buurtest',
        charset='utf8'
    )
    cursor = db.cursor(pymysql.cursors.DictCursor)

    pk = 0
    for j in range(109):
        list = []
        count = 0
        for i in item_based_collabor[j]:
            count += 1
            if count != j + 1:
                list.append([j + 1, count, i])

        list.sort(key=lambda x: (-x[2]))

        list = list[:12]
        for i in range(len(list)):
            pk += 1
            list[i].insert(0, pk)
        # print(list)
        insert_sql = "INSERT INTO `similar_beer` VALUES (%s, %s, %s, %s);"
        cursor.executemany(insert_sql, list)
        db.commit()


# 데이터 입력. list 형 데이터
# insert_data = [['raul', 10], ['zidane', 7], ['ronaldo', 9]]
# insert_sql = "INSERT INTO `people` VALUES (%s, %s);"
# cursor.executemany(insert_sql, insert_data)
# db.commit()
