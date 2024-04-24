import json
import psycopg2
import psycopg2.extras

def connect_to_db():
    return psycopg2.connect(
        host="ep-divine-waterfall-a4qo56m0-pooler.us-east-1.aws.neon.tech",
        database="verceldb",
        user="default",
        password="6v1UnCVSYkyw"
    )

def load_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        return json.load(file)

def insert_data(cities_data):
    cities_query = """
        INSERT INTO cities (id, code, name, persian_name, province_name, province_persian_name, is_capital, "order")
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
    """
    expressions_query = """
        INSERT INTO search_expressions (city_id, expression)
        VALUES (%s, %s);
    """

    try:
        conn = connect_to_db()
        cursor = conn.cursor()

       
        cursor.execute("TRUNCATE TABLE cities, search_expressions CASCADE;")
        print("Truncated cities and search_expressions tables.")

        i = 0
        for city in cities_data:
            i += 1
            cursor.execute(cities_query, (
                city['ID'], 
                city['Code'], 
                city['Name'], 
                city['PersianName'], 
                city['ProvinceName'], 
                city['ProvincePersianName'], 
                city['IsCapital'], 
                city['Order']
            ))
            city_id = cursor.fetchone()[0]  

            expression_data = [(city_id, expr) for expr in city['SearchExpressions']]
            psycopg2.extras.execute_batch(cursor, expressions_query, expression_data)
            print(f"{i}. Inserted {len(expression_data)} expressions for city ID {city_id}")

        conn.commit()  
        print("All city and expression data inserted successfully.")

    except psycopg2.DatabaseError as e:
        print(f"Database error: {e}")
        conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    cities_data = load_data('cities.json')
    insert_data(cities_data)
