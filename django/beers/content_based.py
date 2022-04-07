from operator import index
import pandas as pd
import pymysql
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def load(path):
    return pd.read_csv(path)

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
    item_based_collabor = cosine_similarity(beer)
    print(item_based_collabor.shape)
    item_based_collabor = pd.DataFrame(
        data=item_based_collabor, index=beer.index)
    # 해당하는 맥주와 비슷한 6개 추천

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

