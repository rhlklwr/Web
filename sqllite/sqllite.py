import sqlite3
from employee import Employee

# conn = sqlite3.connect(':memory:') # In memory database
conn = sqlite3.connect('employee.db') # In memory database

c = conn.cursor()

# c.execute("""CREATE TABLE employees(
#              first text,
#              last text,
#              pay integer
#             ) """)

employee1 = Employee('emp1', 'emp1last','8000')
employee2 = Employee('emp2', 'emp2last','7000')


# c.execute("INSERT INTO employees VALUES ('Rahul', 'Kalwar', '50')")
# c.execute("INSERT INTO employees VALUES ('John', 'Kalwar', '5000')")
# conn.commit()

# c.execute("INSERT INTO employees VALUES (?, ?, ?)", (employee1.first, employee1.last, employee1.pay))
# c.execute("INSERT INTO employees VALUES (?, ?, ?)", (employee2.first, employee2.last, employee2.pay))

# c.execute("INSERT INTO employees VALUES (:first, :last, :pay)", 
#           {'first': employee1.first, 'last': employee1.last, 'pay': employee1.pay})
# conn.commit()

# c.execute("INSERT INTO employees VALUES (:first, :last, :pay)", 
#           {'first': employee2.first, 'last': employee2.last, 'pay': employee2.pay})
# conn.commit()

# c.execute("SELECT * FROM employees")
# c.execute("SELECT * FROM employees WHERE last=?", ("Kalwar"))
c.execute("SELECT * FROM employees WHERE last=:last", {"last": "Kalwar"})

# print(c.fetchone())
# print(c.fetchmany(5))
print(c.fetchall())

conn.commit()

conn.close()