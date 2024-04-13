import json
import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="ep-polished-lab-a45rj9zc-pooler.us-east-1.aws.neon.tech",
    database="verceldb",
    user="default",
    password="DE3fRxcL6ugU"
)
cursor = conn.cursor()

# Open the JSON file
with open('cities.json', 'r', encoding='utf-8') as file:
    cities_data = json.load(file)

# Prepare the INSERT query
query = """
    INSERT INTO city (ID, Code, Name, PersianName, ProvinceName, ProvincePersianName, SearchExpressions, IsCapital, "Order")
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

# Create a list of tuples containing data for each city
city_values = [
    (
        city['ID'], 
        city['Code'], 
        city['Name'], 
        city['PersianName'], 
        city['ProvinceName'], 
        city['ProvincePersianName'], 
        city['SearchExpressions'], 
        city['IsCapital'], 
        city['Order']
    )
    for city in cities_data
]

print("Number of cities: ", len(city_values))
# Execute the INSERT queries for all cities
batch_size = 100  # Set the batch size
for i in range(0, len(city_values), batch_size):
    batch = city_values[i:i + batch_size]
    cursor.executemany(query, batch)

    # Print progress
    print(f"Inserted {min(i + batch_size, len(city_values))} cities")

# Close the cursor and connection
conn.commit()  # Commit changes after each batch
cursor.close()
conn.close()
