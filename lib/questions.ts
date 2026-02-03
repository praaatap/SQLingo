export interface Question {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  datasetSQL: string
  starterSQL: string
  expectedQuerySQL: string
  orderMatters?: boolean
  tags: string[]
  hints: string[]
  constraints?: string[]
}

// Common dataset definitions
const employeesDataset = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hire_date TEXT NOT NULL,
  manager_id INTEGER
);

INSERT INTO employees (id, name, department, salary, hire_date, manager_id) VALUES
(1, 'Aarav Sharma', 'Engineering', 85000, '2020-03-15', NULL),
(2, 'Priya Patel', 'Engineering', 75000, '2021-06-01', 1),
(3, 'Rahul Gupta', 'Marketing', 65000, '2019-09-20', NULL),
(4, 'Ananya Singh', 'Engineering', 90000, '2018-01-10', 1),
(5, 'Vikram Reddy', 'Sales', 70000, '2022-02-28', NULL),
(6, 'Sneha Iyer', 'Marketing', 72000, '2020-11-15', 3),
(7, 'Arjun Nair', 'Sales', 68000, '2021-08-05', 5),
(8, 'Kavita Menon', 'HR', 60000, '2019-04-12', NULL),
(9, 'Rohan Joshi', 'Engineering', 82000, '2020-07-22', 1),
(10, 'Meera Kulkarni', 'Finance', 78000, '2018-12-03', NULL),
(11, 'Aditya Verma', 'Finance', 85000, '2017-05-18', 10),
(12, 'Deepika Rao', 'HR', 55000, '2022-01-20', 8),
(13, 'Karthik Sundaram', 'Engineering', 95000, '2016-08-30', 1),
(14, 'Pooja Bhat', 'Marketing', 62000, '2023-03-10', 3),
(15, 'Nikhil Kapoor', 'Sales', 75000, '2019-10-05', 5);
`

const ordersDataset = `
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  join_date TEXT NOT NULL
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  order_date TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO customers (id, name, email, city, join_date) VALUES
(1, 'Rajesh Kumar', 'rajesh.k@email.com', 'Mumbai', '2022-01-15'),
(2, 'Sunita Devi', 'sunita.d@email.com', 'Delhi', '2022-03-20'),
(3, 'Amit Sharma', 'amit.s@email.com', 'Bangalore', '2021-08-10'),
(4, 'Lakshmi Iyer', 'lakshmi.i@email.com', 'Chennai', '2022-06-05'),
(5, 'Suresh Reddy', 'suresh.r@email.com', 'Hyderabad', '2021-11-25'),
(6, 'Geeta Patel', 'geeta.p@email.com', 'Ahmedabad', '2023-02-14'),
(7, 'Mahesh Nair', 'mahesh.n@email.com', 'Kochi', '2022-09-08'),
(8, 'Rani Gupta', 'rani.g@email.com', 'Kolkata', '2021-04-30'),
(9, 'Venkat Rao', 'venkat.r@email.com', 'Pune', '2022-12-01'),
(10, 'Anjali Menon', 'anjali.m@email.com', 'Mumbai', '2023-01-22');

INSERT INTO products (id, name, category, price, stock) VALUES
(1, 'Laptop Pro', 'Electronics', 75000, 50),
(2, 'Wireless Mouse', 'Electronics', 1500, 200),
(3, 'Office Chair', 'Furniture', 8500, 75),
(4, 'Desk Lamp', 'Home', 2200, 150),
(5, 'Notebook Set', 'Stationery', 350, 500),
(6, 'Bluetooth Speaker', 'Electronics', 4500, 100),
(7, 'Standing Desk', 'Furniture', 25000, 30),
(8, 'Pen Drive 64GB', 'Electronics', 800, 300),
(9, 'Water Bottle', 'Home', 450, 400),
(10, 'Backpack', 'Accessories', 2500, 120);

INSERT INTO orders (id, customer_id, amount, order_date, status) VALUES
(1, 1, 76500, '2023-01-20', 'Delivered'),
(2, 2, 8850, '2023-01-25', 'Delivered'),
(3, 3, 4500, '2023-02-01', 'Delivered'),
(4, 1, 2200, '2023-02-15', 'Delivered'),
(5, 4, 25000, '2023-02-20', 'Shipped'),
(6, 5, 3000, '2023-03-01', 'Delivered'),
(7, 2, 75000, '2023-03-10', 'Processing'),
(8, 6, 1150, '2023-03-15', 'Delivered'),
(9, 7, 10700, '2023-03-20', 'Shipped'),
(10, 3, 800, '2023-04-01', 'Delivered'),
(11, 8, 27500, '2023-04-10', 'Delivered'),
(12, 9, 5300, '2023-04-15', 'Processing'),
(13, 1, 4500, '2023-04-20', 'Delivered'),
(14, 10, 8500, '2023-05-01', 'Shipped'),
(15, 5, 76500, '2023-05-10', 'Processing');

INSERT INTO order_items (id, order_id, product_id, quantity) VALUES
(1, 1, 1, 1), (2, 1, 2, 1),
(3, 2, 3, 1), (4, 2, 5, 1),
(5, 3, 6, 1),
(6, 4, 4, 1),
(7, 5, 7, 1),
(8, 6, 2, 2),
(9, 7, 1, 1),
(10, 8, 8, 1), (11, 8, 5, 1),
(12, 9, 3, 1), (13, 9, 4, 1),
(14, 10, 8, 1),
(15, 11, 7, 1), (16, 11, 10, 1),
(17, 12, 6, 1), (18, 12, 8, 1),
(19, 13, 6, 1),
(20, 14, 3, 1),
(21, 15, 1, 1), (22, 15, 2, 1);
`

const studentsDataset = `
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT NOT NULL,
  age INTEGER NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE subjects (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  teacher TEXT NOT NULL
);

CREATE TABLE marks (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  subject_id INTEGER NOT NULL,
  marks INTEGER NOT NULL,
  exam_type TEXT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

INSERT INTO students (id, name, class, section, age, city) VALUES
(1, 'Ishaan Malhotra', '10', 'A', 15, 'Delhi'),
(2, 'Tanya Bose', '10', 'A', 15, 'Kolkata'),
(3, 'Vivek Choudhary', '10', 'B', 16, 'Jaipur'),
(4, 'Shreya Pillai', '10', 'A', 15, 'Chennai'),
(5, 'Dev Saxena', '10', 'B', 15, 'Lucknow'),
(6, 'Nisha Agarwal', '9', 'A', 14, 'Mumbai'),
(7, 'Ravi Krishnan', '9', 'B', 14, 'Bangalore'),
(8, 'Sanya Chopra', '9', 'A', 14, 'Chandigarh'),
(9, 'Kunal Thakur', '9', 'B', 15, 'Pune'),
(10, 'Divya Hegde', '11', 'A', 16, 'Mangalore'),
(11, 'Harsh Trivedi', '11', 'A', 16, 'Ahmedabad'),
(12, 'Pallavi Das', '11', 'B', 17, 'Bhubaneswar'),
(13, 'Yash Bhardwaj', '12', 'A', 17, 'Noida'),
(14, 'Mira Shetty', '12', 'A', 17, 'Goa'),
(15, 'Sahil Dhawan', '12', 'B', 18, 'Amritsar');

INSERT INTO subjects (id, name, teacher) VALUES
(1, 'Mathematics', 'Dr. Ramesh Iyer'),
(2, 'Physics', 'Mrs. Kamala Devi'),
(3, 'Chemistry', 'Mr. Sunil Mehta'),
(4, 'English', 'Ms. Fatima Khan'),
(5, 'Hindi', 'Mr. Govind Prasad'),
(6, 'Computer Science', 'Mr. Ajay Bansal');

INSERT INTO marks (id, student_id, subject_id, marks, exam_type) VALUES
(1, 1, 1, 92, 'Final'), (2, 1, 2, 88, 'Final'), (3, 1, 3, 85, 'Final'),
(4, 2, 1, 78, 'Final'), (5, 2, 2, 82, 'Final'), (6, 2, 3, 90, 'Final'),
(7, 3, 1, 65, 'Final'), (8, 3, 2, 70, 'Final'), (9, 3, 3, 68, 'Final'),
(10, 4, 1, 95, 'Final'), (11, 4, 2, 91, 'Final'), (12, 4, 3, 94, 'Final'),
(13, 5, 1, 72, 'Final'), (14, 5, 2, 75, 'Final'), (15, 5, 3, 70, 'Final'),
(16, 6, 1, 88, 'Final'), (17, 6, 4, 92, 'Final'), (18, 6, 5, 95, 'Final'),
(19, 7, 1, 76, 'Final'), (20, 7, 4, 80, 'Final'), (21, 7, 5, 85, 'Final'),
(22, 8, 1, 90, 'Final'), (23, 8, 4, 88, 'Final'), (24, 8, 5, 82, 'Final'),
(25, 9, 1, 60, 'Final'), (26, 9, 4, 65, 'Final'), (27, 9, 5, 70, 'Final'),
(28, 10, 1, 85, 'Final'), (29, 10, 6, 92, 'Final'), (30, 10, 2, 80, 'Final'),
(31, 11, 1, 78, 'Final'), (32, 11, 6, 88, 'Final'), (33, 11, 2, 75, 'Final'),
(34, 12, 1, 82, 'Final'), (35, 12, 6, 78, 'Final'), (36, 12, 2, 85, 'Final'),
(37, 13, 1, 95, 'Final'), (38, 13, 6, 98, 'Final'), (39, 13, 2, 92, 'Final'),
(40, 14, 1, 88, 'Final'), (41, 14, 6, 90, 'Final'), (42, 14, 2, 86, 'Final'),
(43, 15, 1, 70, 'Final'), (44, 15, 6, 75, 'Final'), (45, 15, 2, 72, 'Final');
`

const hospitalDataset = `
CREATE TABLE doctors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  consultation_fee INTEGER NOT NULL
);

CREATE TABLE patients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  city TEXT NOT NULL,
  blood_group TEXT NOT NULL
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  appointment_date TEXT NOT NULL,
  status TEXT NOT NULL,
  diagnosis TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

INSERT INTO doctors (id, name, specialization, experience_years, consultation_fee) VALUES
(1, 'Dr. Arun Chatterjee', 'Cardiology', 15, 1500),
(2, 'Dr. Priyanka Desai', 'Dermatology', 8, 800),
(3, 'Dr. Manoj Kumar', 'Orthopedics', 12, 1200),
(4, 'Dr. Shalini Nair', 'Pediatrics', 10, 700),
(5, 'Dr. Rakesh Sinha', 'Neurology', 20, 2000),
(6, 'Dr. Anita Jain', 'Gynecology', 14, 1000),
(7, 'Dr. Suresh Pillai', 'General Medicine', 6, 500),
(8, 'Dr. Meenakshi Rao', 'ENT', 9, 600);

INSERT INTO patients (id, name, age, gender, city, blood_group) VALUES
(1, 'Ramesh Pandey', 45, 'Male', 'Varanasi', 'O+'),
(2, 'Sarita Devi', 32, 'Female', 'Patna', 'A+'),
(3, 'Gopal Krishna', 58, 'Male', 'Hyderabad', 'B+'),
(4, 'Lalita Sharma', 28, 'Female', 'Jaipur', 'AB+'),
(5, 'Mohan Das', 65, 'Male', 'Kolkata', 'O-'),
(6, 'Kamini Gupta', 40, 'Female', 'Delhi', 'A-'),
(7, 'Anil Verma', 35, 'Male', 'Mumbai', 'B+'),
(8, 'Sumitra Patel', 50, 'Female', 'Ahmedabad', 'O+'),
(9, 'Dinesh Yadav', 42, 'Male', 'Lucknow', 'A+'),
(10, 'Rekha Bose', 55, 'Female', 'Chennai', 'AB-'),
(11, 'Prakash Joshi', 30, 'Male', 'Pune', 'B-'),
(12, 'Usha Menon', 48, 'Female', 'Kochi', 'O+');

INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, status, diagnosis) VALUES
(1, 1, 1, '2024-01-10', 'Completed', 'Hypertension'),
(2, 2, 2, '2024-01-11', 'Completed', 'Eczema'),
(3, 3, 5, '2024-01-12', 'Completed', 'Migraine'),
(4, 4, 6, '2024-01-13', 'Completed', 'Routine Checkup'),
(5, 5, 1, '2024-01-14', 'Completed', 'Arrhythmia'),
(6, 6, 4, '2024-01-15', 'Completed', 'Fever'),
(7, 7, 3, '2024-01-16', 'Completed', 'Knee Pain'),
(8, 8, 7, '2024-01-17', 'Cancelled', NULL),
(9, 9, 8, '2024-01-18', 'Completed', 'Sinusitis'),
(10, 10, 5, '2024-01-19', 'Completed', 'Vertigo'),
(11, 11, 3, '2024-01-20', 'Scheduled', NULL),
(12, 12, 6, '2024-01-21', 'Scheduled', NULL),
(13, 1, 7, '2024-01-22', 'Completed', 'Follow-up'),
(14, 3, 1, '2024-01-23', 'Completed', 'Heart Checkup'),
(15, 5, 5, '2024-01-24', 'Scheduled', NULL);
`

const libraryDataset = `
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  published_year INTEGER NOT NULL,
  copies_available INTEGER NOT NULL
);

CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  join_date TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE borrowings (
  id INTEGER PRIMARY KEY,
  book_id INTEGER NOT NULL,
  member_id INTEGER NOT NULL,
  borrow_date TEXT NOT NULL,
  return_date TEXT,
  status TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);

INSERT INTO books (id, title, author, genre, published_year, copies_available) VALUES
(1, 'The Guide', 'R.K. Narayan', 'Fiction', 1958, 5),
(2, 'Train to Pakistan', 'Khushwant Singh', 'Historical Fiction', 1956, 3),
(3, 'Wings of Fire', 'A.P.J. Abdul Kalam', 'Autobiography', 1999, 8),
(4, 'The God of Small Things', 'Arundhati Roy', 'Fiction', 1997, 4),
(5, 'Discovery of India', 'Jawaharlal Nehru', 'History', 1946, 2),
(6, 'Gitanjali', 'Rabindranath Tagore', 'Poetry', 1910, 6),
(7, 'Malgudi Days', 'R.K. Narayan', 'Short Stories', 1943, 7),
(8, 'India After Gandhi', 'Ramachandra Guha', 'History', 2007, 3),
(9, 'The White Tiger', 'Aravind Adiga', 'Fiction', 2008, 5),
(10, 'Ignited Minds', 'A.P.J. Abdul Kalam', 'Motivational', 2002, 10),
(11, 'The Argumentative Indian', 'Amartya Sen', 'Essays', 2005, 4),
(12, 'Godan', 'Munshi Premchand', 'Fiction', 1936, 3);

INSERT INTO members (id, name, membership_type, join_date, phone) VALUES
(1, 'Ashok Banerjee', 'Premium', '2022-01-10', '9876543210'),
(2, 'Vidya Lakshmi', 'Standard', '2022-03-15', '9876543211'),
(3, 'Rajan Iyer', 'Premium', '2021-08-20', '9876543212'),
(4, 'Parvati Devi', 'Student', '2023-01-05', '9876543213'),
(5, 'Kishore Saran', 'Standard', '2022-06-12', '9876543214'),
(6, 'Meghna Roy', 'Premium', '2021-11-30', '9876543215'),
(7, 'Sudhir Mishra', 'Student', '2023-02-28', '9876543216'),
(8, 'Anupama Verma', 'Standard', '2022-09-18', '9876543217');

INSERT INTO borrowings (id, book_id, member_id, borrow_date, return_date, status) VALUES
(1, 1, 1, '2024-01-05', '2024-01-19', 'Returned'),
(2, 3, 2, '2024-01-08', '2024-01-22', 'Returned'),
(3, 5, 3, '2024-01-10', NULL, 'Borrowed'),
(4, 4, 1, '2024-01-12', '2024-01-26', 'Returned'),
(5, 7, 4, '2024-01-15', NULL, 'Borrowed'),
(6, 9, 5, '2024-01-18', '2024-02-01', 'Returned'),
(7, 2, 6, '2024-01-20', NULL, 'Borrowed'),
(8, 10, 7, '2024-01-22', NULL, 'Borrowed'),
(9, 6, 8, '2024-01-25', '2024-02-08', 'Returned'),
(10, 8, 3, '2024-01-28', NULL, 'Borrowed'),
(11, 1, 4, '2024-02-01', NULL, 'Borrowed'),
(12, 11, 2, '2024-02-05', NULL, 'Overdue');
`

const restaurantDataset = `
CREATE TABLE restaurants (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  city TEXT NOT NULL,
  rating REAL NOT NULL,
  avg_cost_for_two INTEGER NOT NULL
);

CREATE TABLE menu_items (
  id INTEGER PRIMARY KEY,
  restaurant_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  is_veg INTEGER NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  restaurant_id INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  review_text TEXT,
  review_date TEXT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

INSERT INTO restaurants (id, name, cuisine, city, rating, avg_cost_for_two) VALUES
(1, 'Tandoori Nights', 'North Indian', 'Delhi', 4.5, 1200),
(2, 'Dakshin Delight', 'South Indian', 'Chennai', 4.3, 800),
(3, 'Mumbai Masala', 'Street Food', 'Mumbai', 4.1, 500),
(4, 'Bengal Bites', 'Bengali', 'Kolkata', 4.4, 900),
(5, 'Spice Route', 'Kerala', 'Kochi', 4.6, 1100),
(6, 'Rajasthani Rasoi', 'Rajasthani', 'Jaipur', 4.2, 700),
(7, 'Hyderabadi House', 'Hyderabadi', 'Hyderabad', 4.7, 1000),
(8, 'Punjabi Tadka', 'Punjabi', 'Amritsar', 4.4, 850);

INSERT INTO menu_items (id, restaurant_id, item_name, category, price, is_veg) VALUES
(1, 1, 'Butter Chicken', 'Main Course', 350, 0),
(2, 1, 'Dal Makhani', 'Main Course', 250, 1),
(3, 1, 'Naan', 'Bread', 50, 1),
(4, 2, 'Masala Dosa', 'Breakfast', 120, 1),
(5, 2, 'Idli Sambar', 'Breakfast', 80, 1),
(6, 2, 'Filter Coffee', 'Beverages', 40, 1),
(7, 3, 'Vada Pav', 'Snacks', 30, 1),
(8, 3, 'Pav Bhaji', 'Main Course', 120, 1),
(9, 4, 'Macher Jhol', 'Main Course', 280, 0),
(10, 4, 'Mishti Doi', 'Dessert', 60, 1),
(11, 5, 'Appam with Stew', 'Main Course', 180, 0),
(12, 5, 'Kerala Parotta', 'Bread', 40, 1),
(13, 6, 'Dal Baati Churma', 'Main Course', 220, 1),
(14, 6, 'Ghewar', 'Dessert', 150, 1),
(15, 7, 'Hyderabadi Biryani', 'Main Course', 320, 0),
(16, 7, 'Double Ka Meetha', 'Dessert', 100, 1),
(17, 8, 'Amritsari Kulcha', 'Bread', 90, 1),
(18, 8, 'Lassi', 'Beverages', 70, 1);

INSERT INTO reviews (id, restaurant_id, customer_name, rating, review_text, review_date) VALUES
(1, 1, 'Pradeep Sharma', 5, 'Best butter chicken in town!', '2024-01-10'),
(2, 1, 'Neelam Gupta', 4, 'Good food but slow service', '2024-01-12'),
(3, 2, 'Karthik Ram', 5, 'Authentic South Indian taste', '2024-01-15'),
(4, 3, 'Fatima Sheikh', 4, 'Amazing street food vibes', '2024-01-18'),
(5, 4, 'Sourav Mukherjee', 5, 'Reminds me of home!', '2024-01-20'),
(6, 5, 'Aishwarya Menon', 5, 'Must try the appam', '2024-01-22'),
(7, 6, 'Hemant Singh', 4, 'Good Rajasthani food', '2024-01-25'),
(8, 7, 'Zara Khan', 5, 'Best biryani ever!', '2024-01-28'),
(9, 7, 'Rohit Reddy', 5, 'Authentic Hyderabadi taste', '2024-01-30'),
(10, 8, 'Gurpreet Kaur', 4, 'Delicious kulchas', '2024-02-01');
`

const bankDataset = `
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  account_number TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  balance REAL NOT NULL,
  branch TEXT NOT NULL,
  opened_date TEXT NOT NULL
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  account_id INTEGER NOT NULL,
  transaction_type TEXT NOT NULL,
  amount REAL NOT NULL,
  transaction_date TEXT NOT NULL,
  description TEXT,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

INSERT INTO accounts (id, account_number, holder_name, account_type, balance, branch, opened_date) VALUES
(1, 'SB001234', 'Vijay Anand', 'Savings', 125000.50, 'Mumbai Main', '2019-03-15'),
(2, 'SB001235', 'Shobha Rani', 'Savings', 85000.00, 'Chennai Central', '2020-06-20'),
(3, 'CA001001', 'Narayan Murthy', 'Current', 500000.00, 'Bangalore Tech', '2018-01-10'),
(4, 'SB001236', 'Padma Lakshmi', 'Savings', 45000.75, 'Delhi North', '2021-09-05'),
(5, 'FD001001', 'Subramaniam Iyer', 'Fixed Deposit', 1000000.00, 'Kochi Marine', '2017-12-01'),
(6, 'SB001237', 'Raman Pillai', 'Savings', 32000.25, 'Trivandrum City', '2022-02-28'),
(7, 'CA001002', 'Lata Mangeshkar', 'Current', 750000.00, 'Mumbai Film', '2016-08-15'),
(8, 'SB001238', 'Balaji Srinivasan', 'Savings', 180000.00, 'Hyderabad Tech', '2020-11-11'),
(9, 'SB001239', 'Kavitha Krishnan', 'Savings', 67500.50, 'Coimbatore Mill', '2021-04-22'),
(10, 'RD001001', 'Murali Mohan', 'Recurring Deposit', 240000.00, 'Vijayawada Main', '2019-07-30');

INSERT INTO transactions (id, account_id, transaction_type, amount, transaction_date, description) VALUES
(1, 1, 'Credit', 50000, '2024-01-05', 'Salary'),
(2, 1, 'Debit', 15000, '2024-01-10', 'Rent Payment'),
(3, 2, 'Credit', 35000, '2024-01-06', 'Salary'),
(4, 2, 'Debit', 8000, '2024-01-15', 'Shopping'),
(5, 3, 'Credit', 200000, '2024-01-08', 'Business Income'),
(6, 3, 'Debit', 75000, '2024-01-20', 'Supplier Payment'),
(7, 4, 'Credit', 25000, '2024-01-12', 'Freelance'),
(8, 4, 'Debit', 12000, '2024-01-25', 'EMI'),
(9, 6, 'Credit', 18000, '2024-01-15', 'Pension'),
(10, 6, 'Debit', 5000, '2024-01-28', 'Medical'),
(11, 8, 'Credit', 80000, '2024-01-10', 'Salary'),
(12, 8, 'Debit', 25000, '2024-01-22', 'Investment'),
(13, 9, 'Credit', 30000, '2024-01-08', 'Salary'),
(14, 9, 'Debit', 10000, '2024-01-18', 'Insurance'),
(15, 1, 'Debit', 5000, '2024-01-28', 'Utilities');
`

const cricketDataset = `
CREATE TABLE teams (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  home_ground TEXT NOT NULL,
  captain TEXT NOT NULL
);

CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  team_id INTEGER NOT NULL,
  role TEXT NOT NULL,
  age INTEGER NOT NULL,
  matches_played INTEGER NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE match_stats (
  id INTEGER PRIMARY KEY,
  player_id INTEGER NOT NULL,
  match_date TEXT NOT NULL,
  runs_scored INTEGER NOT NULL,
  wickets_taken INTEGER NOT NULL,
  catches INTEGER NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(id)
);

INSERT INTO teams (id, name, home_ground, captain) VALUES
(1, 'Mumbai Indians', 'Wankhede Stadium', 'Hardik Pandya'),
(2, 'Chennai Super Kings', 'M.A. Chidambaram Stadium', 'Ruturaj Gaikwad'),
(3, 'Royal Challengers', 'M. Chinnaswamy Stadium', 'Faf du Plessis'),
(4, 'Kolkata Knight Riders', 'Eden Gardens', 'Shreyas Iyer'),
(5, 'Delhi Capitals', 'Arun Jaitley Stadium', 'Rishabh Pant');

INSERT INTO players (id, name, team_id, role, age, matches_played) VALUES
(1, 'Rohit Sharma', 1, 'Batsman', 36, 250),
(2, 'Jasprit Bumrah', 1, 'Bowler', 30, 130),
(3, 'Suryakumar Yadav', 1, 'Batsman', 33, 95),
(4, 'MS Dhoni', 2, 'Wicketkeeper', 42, 240),
(5, 'Ravindra Jadeja', 2, 'All-rounder', 35, 200),
(6, 'Virat Kohli', 3, 'Batsman', 35, 230),
(7, 'Mohammed Siraj', 3, 'Bowler', 29, 65),
(8, 'Andre Russell', 4, 'All-rounder', 35, 110),
(9, 'Sunil Narine', 4, 'All-rounder', 35, 160),
(10, 'Rishabh Pant', 5, 'Wicketkeeper', 26, 85),
(11, 'Axar Patel', 5, 'All-rounder', 30, 75),
(12, 'David Warner', 5, 'Batsman', 37, 180);

INSERT INTO match_stats (id, player_id, match_date, runs_scored, wickets_taken, catches) VALUES
(1, 1, '2024-03-22', 78, 0, 1),
(2, 2, '2024-03-22', 5, 3, 0),
(3, 6, '2024-03-23', 112, 0, 2),
(4, 7, '2024-03-23', 12, 2, 1),
(5, 4, '2024-03-24', 45, 0, 3),
(6, 5, '2024-03-24', 38, 2, 1),
(7, 8, '2024-03-25', 65, 1, 0),
(8, 9, '2024-03-25', 28, 4, 2),
(9, 10, '2024-03-26', 82, 0, 4),
(10, 12, '2024-03-26', 95, 0, 1),
(11, 3, '2024-03-27', 105, 0, 0),
(12, 11, '2024-03-27', 22, 3, 1);
`

export const questions: Question[] = [
  // ===== EASY QUESTIONS (1-35) =====
  {
    id: "1",
    title: "Select All Employees",
    difficulty: "Easy",
    description: `Write a SQL query to retrieve all columns from the \`employees\` table.

### Example Output
| id | name | department | salary | hire_date | manager_id |
|----|------|------------|--------|-----------|------------|
| 1 | Aarav Sharma | Engineering | 85000 | 2020-03-15 | NULL |
| ... | ... | ... | ... | ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Write your query here\nSELECT ",
    expectedQuerySQL: "SELECT * FROM employees",
    tags: ["SELECT", "basics"],
    hints: ["Use SELECT * to get all columns", "The table name is 'employees'"],
  },
  {
    id: "2",
    title: "Select Employee Names",
    difficulty: "Easy",
    description: `Write a SQL query to get only the **name** and **department** columns from the employees table.

### Example Output
| name | department |
|------|------------|
| Aarav Sharma | Engineering |
| Priya Patel | Engineering |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Select specific columns\nSELECT ",
    expectedQuerySQL: "SELECT name, department FROM employees",
    tags: ["SELECT", "columns"],
    hints: ["List the columns you want separated by commas", "No need for * when selecting specific columns"],
  },
  {
    id: "3",
    title: "Filter by Department",
    difficulty: "Easy",
    description: `Write a SQL query to find all employees in the **Engineering** department.

### Example Output
| id | name | department | salary | hire_date | manager_id |
|----|------|------------|--------|-----------|------------|
| 1 | Aarav Sharma | Engineering | 85000 | 2020-03-15 | NULL |
| 2 | Priya Patel | Engineering | 75000 | 2021-06-01 | 1 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Filter employees by department\nSELECT * FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT * FROM employees WHERE department = 'Engineering'",
    tags: ["SELECT", "WHERE", "filtering"],
    hints: ["Use the WHERE clause to filter rows", "String values need to be in quotes"],
  },
  {
    id: "4",
    title: "High Salary Employees",
    difficulty: "Easy",
    description: `Write a SQL query to find all employees with salary greater than 75000.

### Expected Columns
- name
- salary

### Example Output
| name | salary |
|------|--------|
| Aarav Sharma | 85000 |
| Ananya Singh | 90000 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find high salary employees\nSELECT ",
    expectedQuerySQL: "SELECT name, salary FROM employees WHERE salary > 75000",
    tags: ["SELECT", "WHERE", "comparison"],
    hints: ["Use > operator for greater than comparison", "No quotes needed for numbers"],
  },
  {
    id: "5",
    title: "Count All Employees",
    difficulty: "Easy",
    description: `Write a SQL query to count the total number of employees in the company.

### Expected Output
| total_employees |
|-----------------|
| 15 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Count total employees\nSELECT ",
    expectedQuerySQL: "SELECT COUNT(*) as total_employees FROM employees",
    tags: ["COUNT", "aggregation"],
    hints: ["Use COUNT(*) to count all rows", "Use AS to give your column a name"],
  },
  {
    id: "6",
    title: "Unique Departments",
    difficulty: "Easy",
    description: `Write a SQL query to list all unique departments in the company.

### Example Output
| department |
|------------|
| Engineering |
| Marketing |
| Sales |
| HR |
| Finance |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Get unique departments\nSELECT ",
    expectedQuerySQL: "SELECT DISTINCT department FROM employees",
    tags: ["DISTINCT", "unique"],
    hints: ["Use DISTINCT to remove duplicate values", "DISTINCT goes right after SELECT"],
  },
  {
    id: "7",
    title: "Order by Salary",
    difficulty: "Easy",
    description: `Write a SQL query to list all employees ordered by salary from highest to lowest.

### Expected Columns
- name
- salary

### Example Output
| name | salary |
|------|--------|
| Karthik Sundaram | 95000 |
| Ananya Singh | 90000 |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Order employees by salary\nSELECT name, salary FROM employees\n",
    expectedQuerySQL: "SELECT name, salary FROM employees ORDER BY salary DESC",
    orderMatters: true,
    tags: ["ORDER BY", "sorting"],
    hints: ["Use ORDER BY to sort results", "DESC means descending (highest first)"],
  },
  {
    id: "8",
    title: "Limit Results",
    difficulty: "Easy",
    description: `Write a SQL query to get the top 5 highest paid employees.

### Expected Columns
- name
- salary

### Example Output
| name | salary |
|------|--------|
| Karthik Sundaram | 95000 |
| Ananya Singh | 90000 |
| Aarav Sharma | 85000 |
| Aditya Verma | 85000 |
| Rohan Joshi | 82000 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Get top 5 salaries\nSELECT name, salary FROM employees\n",
    expectedQuerySQL: "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5",
    orderMatters: true,
    tags: ["LIMIT", "ORDER BY"],
    hints: ["Use LIMIT to restrict number of rows", "Combine with ORDER BY DESC for top N"],
  },
  {
    id: "9",
    title: "Filter with AND",
    difficulty: "Easy",
    description: `Write a SQL query to find Engineering employees with salary above 80000.

### Example Output
| name | department | salary |
|------|------------|--------|
| Aarav Sharma | Engineering | 85000 |
| Ananya Singh | Engineering | 90000 |
| Rohan Joshi | Engineering | 82000 |
| Karthik Sundaram | Engineering | 95000 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Filter with multiple conditions\nSELECT name, department, salary FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, department, salary FROM employees WHERE department = 'Engineering' AND salary > 80000",
    tags: ["WHERE", "AND", "filtering"],
    hints: ["Use AND to combine multiple conditions", "Both conditions must be true"],
  },
  {
    id: "10",
    title: "Filter with OR",
    difficulty: "Easy",
    description: `Write a SQL query to find employees in either Marketing OR Sales departments.

### Expected Columns
- name
- department

### Example Output
| name | department |
|------|------------|
| Rahul Gupta | Marketing |
| Vikram Reddy | Sales |
| Sneha Iyer | Marketing |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Filter with OR\nSELECT name, department FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, department FROM employees WHERE department = 'Marketing' OR department = 'Sales'",
    tags: ["WHERE", "OR", "filtering"],
    hints: ["Use OR when either condition can be true", "Each condition needs the column name"],
  },
  {
    id: "11",
    title: "Using IN Clause",
    difficulty: "Easy",
    description: `Write a SQL query to find employees in Engineering, Finance, or HR departments using the IN clause.

### Expected Columns
- name
- department

### Example Output
| name | department |
|------|------------|
| Aarav Sharma | Engineering |
| Kavita Menon | HR |
| Meera Kulkarni | Finance |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Use IN clause\nSELECT name, department FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, department FROM employees WHERE department IN ('Engineering', 'Finance', 'HR')",
    tags: ["WHERE", "IN", "filtering"],
    hints: ["IN is cleaner than multiple OR conditions", "Values in IN should be in parentheses"],
  },
  {
    id: "12",
    title: "Using LIKE Pattern",
    difficulty: "Easy",
    description: `Write a SQL query to find all employees whose name starts with 'A'.

### Expected Columns
- name
- department

### Example Output
| name | department |
|------|------------|
| Aarav Sharma | Engineering |
| Ananya Singh | Engineering |
| Arjun Nair | Sales |
| Aditya Verma | Finance |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find names starting with 'A'\nSELECT name, department FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, department FROM employees WHERE name LIKE 'A%'",
    tags: ["LIKE", "pattern matching"],
    hints: ["Use LIKE for pattern matching", "% matches any number of characters"],
  },
  {
    id: "13",
    title: "Count by Department",
    difficulty: "Easy",
    description: `Write a SQL query to count the number of employees in each department.

### Example Output
| department | employee_count |
|------------|----------------|
| Engineering | 5 |
| Marketing | 3 |
| Sales | 3 |
| HR | 2 |
| Finance | 2 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Count employees by department\nSELECT department, \n",
    expectedQuerySQL: "SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department",
    tags: ["COUNT", "GROUP BY"],
    hints: ["Use COUNT(*) with GROUP BY", "GROUP BY groups rows by column value"],
  },
  {
    id: "14",
    title: "Sum of Salaries",
    difficulty: "Easy",
    description: `Write a SQL query to find the total salary expense for each department.

### Example Output
| department | total_salary |
|------------|--------------|
| Engineering | 407000 |
| Marketing | 199000 |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Sum salaries by department\nSELECT department, \n",
    expectedQuerySQL: "SELECT department, SUM(salary) as total_salary FROM employees GROUP BY department",
    tags: ["SUM", "GROUP BY"],
    hints: ["Use SUM() to add up values", "Combine with GROUP BY for per-group totals"],
  },
  {
    id: "15",
    title: "Average Salary",
    difficulty: "Easy",
    description: `Write a SQL query to find the average salary of all employees.

### Example Output
| avg_salary |
|------------|
| 73000.0 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Calculate average salary\nSELECT ",
    expectedQuerySQL: "SELECT AVG(salary) as avg_salary FROM employees",
    tags: ["AVG", "aggregation"],
    hints: ["Use AVG() for average calculation", "This gives company-wide average"],
  },
  {
    id: "16",
    title: "Min and Max Salary",
    difficulty: "Easy",
    description: `Write a SQL query to find the minimum and maximum salary in the company.

### Example Output
| min_salary | max_salary |
|------------|------------|
| 55000 | 95000 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find min and max salary\nSELECT ",
    expectedQuerySQL: "SELECT MIN(salary) as min_salary, MAX(salary) as max_salary FROM employees",
    tags: ["MIN", "MAX", "aggregation"],
    hints: ["Use MIN() and MAX() functions", "Both can be used in the same query"],
  },
  {
    id: "17",
    title: "NULL Manager Check",
    difficulty: "Easy",
    description: `Write a SQL query to find all employees who don't have a manager (manager_id is NULL).

### Expected Columns
- name
- department

### Example Output
| name | department |
|------|------------|
| Aarav Sharma | Engineering |
| Rahul Gupta | Marketing |
| Vikram Reddy | Sales |
| Kavita Menon | HR |
| Meera Kulkarni | Finance |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find employees without managers\nSELECT name, department FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, department FROM employees WHERE manager_id IS NULL",
    tags: ["NULL", "IS NULL"],
    hints: ["Use IS NULL to check for NULL values", "Don't use = NULL, it won't work"],
  },
  {
    id: "18",
    title: "Between Dates",
    difficulty: "Easy",
    description: `Write a SQL query to find employees hired between 2020-01-01 and 2021-12-31.

### Expected Columns
- name
- hire_date

### Example Output
| name | hire_date |
|------|-----------|
| Aarav Sharma | 2020-03-15 |
| Priya Patel | 2021-06-01 |
| ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find employees hired in date range\nSELECT name, hire_date FROM employees\nWHERE ",
    expectedQuerySQL: "SELECT name, hire_date FROM employees WHERE hire_date BETWEEN '2020-01-01' AND '2021-12-31'",
    tags: ["BETWEEN", "dates"],
    hints: ["BETWEEN includes both endpoints", "Date format is 'YYYY-MM-DD'"],
  },
  {
    id: "19",
    title: "All Customers",
    difficulty: "Easy",
    description: `Write a SQL query to get all customers with their name, email, and city.

### Example Output
| name | email | city |
|------|-------|------|
| Rajesh Kumar | rajesh.k@email.com | Mumbai |
| Sunita Devi | sunita.d@email.com | Delhi |
| ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Get customer details\nSELECT ",
    expectedQuerySQL: "SELECT name, email, city FROM customers",
    tags: ["SELECT", "basics"],
    hints: ["List the columns you need", "Customer data is in the customers table"],
  },
  {
    id: "20",
    title: "Products by Category",
    difficulty: "Easy",
    description: `Write a SQL query to list all products in the 'Electronics' category.

### Example Output
| name | price |
|------|-------|
| Laptop Pro | 75000 |
| Wireless Mouse | 1500 |
| Bluetooth Speaker | 4500 |
| Pen Drive 64GB | 800 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Get electronics products\nSELECT ",
    expectedQuerySQL: "SELECT name, price FROM products WHERE category = 'Electronics'",
    tags: ["WHERE", "filtering"],
    hints: ["Filter on the category column", "Use single quotes for text values"],
  },
  {
    id: "21",
    title: "Delivered Orders",
    difficulty: "Easy",
    description: `Write a SQL query to count how many orders have been delivered.

### Example Output
| delivered_count |
|-----------------|
| 9 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Count delivered orders\nSELECT ",
    expectedQuerySQL: "SELECT COUNT(*) as delivered_count FROM orders WHERE status = 'Delivered'",
    tags: ["COUNT", "WHERE"],
    hints: ["Use COUNT(*) to count rows", "Filter by status = 'Delivered'"],
  },
  {
    id: "22",
    title: "Students from Delhi",
    difficulty: "Easy",
    description: `Write a SQL query to find all students who live in Delhi.

### Expected Columns
- name
- class
- city

### Example Output
| name | class | city |
|------|-------|------|
| Ishaan Malhotra | 10 | Delhi |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Find Delhi students\nSELECT ",
    expectedQuerySQL: "SELECT name, class, city FROM students WHERE city = 'Delhi'",
    tags: ["WHERE", "filtering"],
    hints: ["Filter students by city column", "Delhi is a text value"],
  },
  {
    id: "23",
    title: "Count Students by Class",
    difficulty: "Easy",
    description: `Write a SQL query to count how many students are in each class.

### Example Output
| class | student_count |
|-------|---------------|
| 9 | 4 |
| 10 | 5 |
| 11 | 3 |
| 12 | 3 |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Count students per class\nSELECT ",
    expectedQuerySQL: "SELECT class, COUNT(*) as student_count FROM students GROUP BY class",
    tags: ["COUNT", "GROUP BY"],
    hints: ["Group by the class column", "COUNT(*) gives number in each group"],
  },
  {
    id: "24",
    title: "Doctor Specializations",
    difficulty: "Easy",
    description: `Write a SQL query to list all unique doctor specializations available in the hospital.

### Example Output
| specialization |
|----------------|
| Cardiology |
| Dermatology |
| ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Get unique specializations\nSELECT ",
    expectedQuerySQL: "SELECT DISTINCT specialization FROM doctors",
    tags: ["DISTINCT"],
    hints: ["Use DISTINCT to remove duplicates", "We only need the specialization column"],
  },
  {
    id: "25",
    title: "Books by Genre",
    difficulty: "Easy",
    description: `Write a SQL query to count how many books are in each genre.

### Example Output
| genre | book_count |
|-------|------------|
| Fiction | 4 |
| History | 2 |
| ... | ... |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Count books by genre\nSELECT ",
    expectedQuerySQL: "SELECT genre, COUNT(*) as book_count FROM books GROUP BY genre",
    tags: ["COUNT", "GROUP BY"],
    hints: ["Group books by their genre", "COUNT(*) gives total in each group"],
  },
  {
    id: "26",
    title: "Restaurant Ratings",
    difficulty: "Easy",
    description: `Write a SQL query to find all restaurants with rating of 4.5 or higher.

### Expected Columns
- name
- cuisine
- rating

### Example Output
| name | cuisine | rating |
|------|---------|--------|
| Tandoori Nights | North Indian | 4.5 |
| Spice Route | Kerala | 4.6 |
| Hyderabadi House | Hyderabadi | 4.7 |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Find highly rated restaurants\nSELECT ",
    expectedQuerySQL: "SELECT name, cuisine, rating FROM restaurants WHERE rating >= 4.5",
    tags: ["WHERE", "comparison"],
    hints: ["Use >= for 'greater than or equal'", "Rating is a decimal number"],
  },
  {
    id: "27",
    title: "Vegetarian Items",
    difficulty: "Easy",
    description: `Write a SQL query to find all vegetarian menu items (is_veg = 1).

### Expected Columns
- item_name
- category
- price

### Example Output
| item_name | category | price |
|-----------|----------|-------|
| Dal Makhani | Main Course | 250 |
| Naan | Bread | 50 |
| ... | ... | ... |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Find vegetarian items\nSELECT ",
    expectedQuerySQL: "SELECT item_name, category, price FROM menu_items WHERE is_veg = 1",
    tags: ["WHERE", "boolean"],
    hints: ["is_veg = 1 means vegetarian", "No quotes needed for numbers"],
  },
  {
    id: "28",
    title: "Savings Accounts",
    difficulty: "Easy",
    description: `Write a SQL query to find all savings accounts with their holder name and balance.

### Example Output
| holder_name | balance |
|-------------|---------|
| Vijay Anand | 125000.5 |
| Shobha Rani | 85000.0 |
| ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Find savings accounts\nSELECT ",
    expectedQuerySQL: "SELECT holder_name, balance FROM accounts WHERE account_type = 'Savings'",
    tags: ["WHERE", "filtering"],
    hints: ["Filter by account_type column", "Savings is the type we want"],
  },
  {
    id: "29",
    title: "IPL Teams",
    difficulty: "Easy",
    description: `Write a SQL query to list all IPL teams with their captain and home ground.

### Example Output
| name | captain | home_ground |
|------|---------|-------------|
| Mumbai Indians | Hardik Pandya | Wankhede Stadium |
| Chennai Super Kings | Ruturaj Gaikwad | M.A. Chidambaram Stadium |
| ... | ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- List all teams\nSELECT ",
    expectedQuerySQL: "SELECT name, captain, home_ground FROM teams",
    tags: ["SELECT", "basics"],
    hints: ["Select the required columns from teams table", "No filtering needed"],
  },
  {
    id: "30",
    title: "Players by Role",
    difficulty: "Easy",
    description: `Write a SQL query to count how many players are in each role (Batsman, Bowler, etc.).

### Example Output
| role | player_count |
|------|--------------|
| Batsman | 4 |
| Bowler | 2 |
| All-rounder | 4 |
| Wicketkeeper | 2 |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Count players by role\nSELECT ",
    expectedQuerySQL: "SELECT role, COUNT(*) as player_count FROM players GROUP BY role",
    tags: ["COUNT", "GROUP BY"],
    hints: ["Group by the role column", "COUNT gives total in each group"],
  },
  {
    id: "31",
    title: "Recent Orders",
    difficulty: "Easy",
    description: `Write a SQL query to get all orders placed in April 2023 (order_date starts with '2023-04').

### Expected Columns
- id
- amount
- order_date
- status

### Example Output
| id | amount | order_date | status |
|----|--------|------------|--------|
| 10 | 800.0 | 2023-04-01 | Delivered |
| 11 | 27500.0 | 2023-04-10 | Delivered |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find April 2023 orders\nSELECT ",
    expectedQuerySQL: "SELECT id, amount, order_date, status FROM orders WHERE order_date LIKE '2023-04%'",
    tags: ["LIKE", "dates"],
    hints: ["Use LIKE with pattern '2023-04%'", "% matches any remaining characters"],
  },
  {
    id: "32",
    title: "Expensive Products",
    difficulty: "Easy",
    description: `Write a SQL query to find products that cost more than 5000, ordered by price descending.

### Expected Columns
- name
- price

### Example Output
| name | price |
|------|-------|
| Laptop Pro | 75000 |
| Standing Desk | 25000 |
| Office Chair | 8500 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find expensive products\nSELECT ",
    expectedQuerySQL: "SELECT name, price FROM products WHERE price > 5000 ORDER BY price DESC",
    orderMatters: true,
    tags: ["WHERE", "ORDER BY"],
    hints: ["Filter by price > 5000", "Order by price in descending order"],
  },
  {
    id: "33",
    title: "Premium Members",
    difficulty: "Easy",
    description: `Write a SQL query to find all library members with 'Premium' membership.

### Expected Columns
- name
- phone

### Example Output
| name | phone |
|------|-------|
| Ashok Banerjee | 9876543210 |
| Rajan Iyer | 9876543212 |
| Meghna Roy | 9876543215 |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Find premium members\nSELECT ",
    expectedQuerySQL: "SELECT name, phone FROM members WHERE membership_type = 'Premium'",
    tags: ["WHERE", "filtering"],
    hints: ["Filter by membership_type column", "Premium is the type we want"],
  },
  {
    id: "34",
    title: "Completed Appointments",
    difficulty: "Easy",
    description: `Write a SQL query to count how many appointments have been completed.

### Example Output
| completed_count |
|-----------------|
| 11 |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Count completed appointments\nSELECT ",
    expectedQuerySQL: "SELECT COUNT(*) as completed_count FROM appointments WHERE status = 'Completed'",
    tags: ["COUNT", "WHERE"],
    hints: ["Filter by status = 'Completed'", "Use COUNT(*) to get total"],
  },
  {
    id: "35",
    title: "High Scorers",
    difficulty: "Easy",
    description: `Write a SQL query to find all marks entries where marks are 90 or above.

### Expected Columns
- student_id
- subject_id
- marks

### Example Output
| student_id | subject_id | marks |
|------------|------------|-------|
| 1 | 1 | 92 |
| 2 | 3 | 90 |
| 4 | 1 | 95 |
| ... | ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Find high scorers\nSELECT ",
    expectedQuerySQL: "SELECT student_id, subject_id, marks FROM marks WHERE marks >= 90",
    tags: ["WHERE", "comparison"],
    hints: ["Filter where marks >= 90", "Simple comparison query"],
  },

  // ===== MEDIUM QUESTIONS (36-75) =====
  {
    id: "36",
    title: "Department Average Salary",
    difficulty: "Medium",
    description: `Write a SQL query to find the average salary for each department, rounded to 2 decimal places.

### Example Output
| department | avg_salary |
|------------|------------|
| Engineering | 81400.0 |
| Finance | 81500.0 |
| HR | 57500.0 |
| Marketing | 66333.33 |
| Sales | 71000.0 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Calculate department averages\nSELECT department, \n",
    expectedQuerySQL: "SELECT department, ROUND(AVG(salary), 2) as avg_salary FROM employees GROUP BY department",
    tags: ["AVG", "GROUP BY", "ROUND"],
    hints: ["Use AVG() with GROUP BY", "ROUND(value, 2) rounds to 2 decimals"],
  },
  {
    id: "37",
    title: "Join Orders with Customers",
    difficulty: "Medium",
    description: `Write a SQL query to list all orders with customer names.

### Expected Columns
- order_id
- customer_name
- amount
- status

### Example Output
| order_id | customer_name | amount | status |
|----------|---------------|--------|--------|
| 1 | Rajesh Kumar | 76500 | Delivered |
| 2 | Sunita Devi | 8850 | Delivered |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Join orders with customers\nSELECT \n",
    expectedQuerySQL: "SELECT orders.id as order_id, customers.name as customer_name, orders.amount, orders.status FROM orders JOIN customers ON orders.customer_id = customers.id",
    tags: ["JOIN", "relationships"],
    hints: ["Use JOIN to combine tables", "Join on customer_id = customers.id"],
  },
  {
    id: "38",
    title: "Customer Order Count",
    difficulty: "Medium",
    description: `Write a SQL query to count how many orders each customer has placed.

### Expected Columns
- customer_name
- order_count

### Example Output
| customer_name | order_count |
|---------------|-------------|
| Rajesh Kumar | 3 |
| Sunita Devi | 2 |
| Amit Sharma | 2 |
| ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Count orders per customer\nSELECT \n",
    expectedQuerySQL: "SELECT customers.name as customer_name, COUNT(orders.id) as order_count FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.id, customers.name",
    tags: ["JOIN", "COUNT", "GROUP BY"],
    hints: ["Join customers with orders", "Group by customer to count their orders"],
  },
  {
    id: "39",
    title: "Total Revenue per Customer",
    difficulty: "Medium",
    description: `Write a SQL query to find total amount spent by each customer.

### Expected Columns
- customer_name
- total_spent

### Example Output
| customer_name | total_spent |
|---------------|-------------|
| Rajesh Kumar | 83200.0 |
| Sunita Devi | 83850.0 |
| ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate total spent per customer\nSELECT \n",
    expectedQuerySQL: "SELECT customers.name as customer_name, SUM(orders.amount) as total_spent FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.id, customers.name",
    tags: ["JOIN", "SUM", "GROUP BY"],
    hints: ["Join customers with orders", "Use SUM to total the amounts"],
  },
  {
    id: "40",
    title: "Orders with Product Details",
    difficulty: "Medium",
    description: `Write a SQL query to list order items with product names and quantities.

### Expected Columns
- order_id
- product_name
- quantity

### Example Output
| order_id | product_name | quantity |
|----------|--------------|----------|
| 1 | Laptop Pro | 1 |
| 1 | Wireless Mouse | 1 |
| 2 | Office Chair | 1 |
| ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Get order items with product names\nSELECT \n",
    expectedQuerySQL: "SELECT order_items.order_id, products.name as product_name, order_items.quantity FROM order_items JOIN products ON order_items.product_id = products.id",
    tags: ["JOIN", "relationships"],
    hints: ["Join order_items with products", "product_id links to products table"],
  },
  {
    id: "41",
    title: "Student Marks with Names",
    difficulty: "Medium",
    description: `Write a SQL query to show student names with their marks in Mathematics.

### Expected Columns
- student_name
- marks

### Example Output
| student_name | marks |
|--------------|-------|
| Ishaan Malhotra | 92 |
| Tanya Bose | 78 |
| ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Get math marks with student names\nSELECT \n",
    expectedQuerySQL: "SELECT students.name as student_name, marks.marks FROM students JOIN marks ON students.id = marks.student_id JOIN subjects ON marks.subject_id = subjects.id WHERE subjects.name = 'Mathematics'",
    tags: ["JOIN", "multiple tables"],
    hints: ["Join students, marks, and subjects", "Filter for Mathematics subject"],
  },
  {
    id: "42",
    title: "Class-wise Average Marks",
    difficulty: "Medium",
    description: `Write a SQL query to find the average marks for each class.

### Expected Columns
- class
- avg_marks

### Example Output
| class | avg_marks |
|-------|-----------|
| 9 | 78.5 |
| 10 | 80.33 |
| 11 | 82.67 |
| 12 | 84.0 |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Calculate class-wise average marks\nSELECT \n",
    expectedQuerySQL: "SELECT students.class, ROUND(AVG(marks.marks), 2) as avg_marks FROM students JOIN marks ON students.id = marks.student_id GROUP BY students.class",
    tags: ["JOIN", "AVG", "GROUP BY"],
    hints: ["Join students with marks", "Group by class for class averages"],
  },
  {
    id: "43",
    title: "Doctor Appointment Count",
    difficulty: "Medium",
    description: `Write a SQL query to count how many appointments each doctor has had.

### Expected Columns
- doctor_name
- appointment_count

### Example Output
| doctor_name | appointment_count |
|-------------|-------------------|
| Dr. Arun Chatterjee | 3 |
| Dr. Rakesh Sinha | 3 |
| ... | ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Count appointments per doctor\nSELECT \n",
    expectedQuerySQL: "SELECT doctors.name as doctor_name, COUNT(appointments.id) as appointment_count FROM doctors JOIN appointments ON doctors.id = appointments.doctor_id GROUP BY doctors.id, doctors.name",
    tags: ["JOIN", "COUNT", "GROUP BY"],
    hints: ["Join doctors with appointments", "Group by doctor to count their appointments"],
  },
  {
    id: "44",
    title: "Patient Diagnosis List",
    difficulty: "Medium",
    description: `Write a SQL query to list all patients with their diagnosis (only completed appointments).

### Expected Columns
- patient_name
- diagnosis

### Example Output
| patient_name | diagnosis |
|--------------|-----------|
| Ramesh Pandey | Hypertension |
| Sarita Devi | Eczema |
| ... | ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Get patient diagnoses\nSELECT \n",
    expectedQuerySQL: "SELECT patients.name as patient_name, appointments.diagnosis FROM patients JOIN appointments ON patients.id = appointments.patient_id WHERE appointments.status = 'Completed' AND appointments.diagnosis IS NOT NULL",
    tags: ["JOIN", "WHERE", "NULL"],
    hints: ["Join patients with appointments", "Filter for completed appointments with diagnosis"],
  },
  {
    id: "45",
    title: "Book Borrowing History",
    difficulty: "Medium",
    description: `Write a SQL query to show book titles with borrower names.

### Expected Columns
- book_title
- borrower_name
- borrow_date
- status

### Example Output
| book_title | borrower_name | borrow_date | status |
|------------|---------------|-------------|--------|
| The Guide | Ashok Banerjee | 2024-01-05 | Returned |
| Wings of Fire | Vidya Lakshmi | 2024-01-08 | Returned |
| ... | ... | ... | ... |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Get borrowing history\nSELECT \n",
    expectedQuerySQL: "SELECT books.title as book_title, members.name as borrower_name, borrowings.borrow_date, borrowings.status FROM borrowings JOIN books ON borrowings.book_id = books.id JOIN members ON borrowings.member_id = members.id",
    tags: ["JOIN", "multiple tables"],
    hints: ["Join borrowings, books, and members", "Three table join needed"],
  },
  {
    id: "46",
    title: "Overdue Books",
    difficulty: "Medium",
    description: `Write a SQL query to find all overdue borrowings with book titles and member names.

### Expected Columns
- book_title
- member_name

### Example Output
| book_title | member_name |
|------------|-------------|
| The Argumentative Indian | Vidya Lakshmi |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Find overdue books\nSELECT \n",
    expectedQuerySQL: "SELECT books.title as book_title, members.name as member_name FROM borrowings JOIN books ON borrowings.book_id = books.id JOIN members ON borrowings.member_id = members.id WHERE borrowings.status = 'Overdue'",
    tags: ["JOIN", "WHERE"],
    hints: ["Join all three tables", "Filter by status = 'Overdue'"],
  },
  {
    id: "47",
    title: "Restaurant Review Summary",
    difficulty: "Medium",
    description: `Write a SQL query to get average review rating for each restaurant.

### Expected Columns
- restaurant_name
- avg_rating
- review_count

### Example Output
| restaurant_name | avg_rating | review_count |
|-----------------|------------|--------------|
| Tandoori Nights | 4.5 | 2 |
| Hyderabadi House | 5.0 | 2 |
| ... | ... | ... |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Get review summary\nSELECT \n",
    expectedQuerySQL: "SELECT restaurants.name as restaurant_name, ROUND(AVG(reviews.rating), 1) as avg_rating, COUNT(reviews.id) as review_count FROM restaurants JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id, restaurants.name",
    tags: ["JOIN", "AVG", "COUNT", "GROUP BY"],
    hints: ["Join restaurants with reviews", "Use AVG for rating, COUNT for total"],
  },
  {
    id: "48",
    title: "Total Bank Deposits",
    difficulty: "Medium",
    description: `Write a SQL query to find total credit amount per account.

### Expected Columns
- holder_name
- total_credits

### Example Output
| holder_name | total_credits |
|-------------|---------------|
| Vijay Anand | 50000 |
| Shobha Rani | 35000 |
| ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Calculate total credits\nSELECT \n",
    expectedQuerySQL: "SELECT accounts.holder_name, SUM(transactions.amount) as total_credits FROM accounts JOIN transactions ON accounts.id = transactions.account_id WHERE transactions.transaction_type = 'Credit' GROUP BY accounts.id, accounts.holder_name",
    tags: ["JOIN", "SUM", "WHERE", "GROUP BY"],
    hints: ["Join accounts with transactions", "Filter for Credit transactions"],
  },
  {
    id: "49",
    title: "Player Statistics",
    difficulty: "Medium",
    description: `Write a SQL query to get total runs scored by each player.

### Expected Columns
- player_name
- total_runs

### Example Output
| player_name | total_runs |
|-------------|------------|
| Virat Kohli | 112 |
| Suryakumar Yadav | 105 |
| David Warner | 95 |
| ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Calculate total runs\nSELECT \n",
    expectedQuerySQL: "SELECT players.name as player_name, SUM(match_stats.runs_scored) as total_runs FROM players JOIN match_stats ON players.id = match_stats.player_id GROUP BY players.id, players.name ORDER BY total_runs DESC",
    orderMatters: true,
    tags: ["JOIN", "SUM", "GROUP BY", "ORDER BY"],
    hints: ["Join players with match_stats", "Sum runs and order by total"],
  },
  {
    id: "50",
    title: "Top Wicket Takers",
    difficulty: "Medium",
    description: `Write a SQL query to find the top 5 wicket takers.

### Expected Columns
- player_name
- total_wickets

### Example Output
| player_name | total_wickets |
|-------------|---------------|
| Sunil Narine | 4 |
| Jasprit Bumrah | 3 |
| Axar Patel | 3 |
| ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Find top wicket takers\nSELECT \n",
    expectedQuerySQL: "SELECT players.name as player_name, SUM(match_stats.wickets_taken) as total_wickets FROM players JOIN match_stats ON players.id = match_stats.player_id GROUP BY players.id, players.name ORDER BY total_wickets DESC LIMIT 5",
    orderMatters: true,
    tags: ["JOIN", "SUM", "ORDER BY", "LIMIT"],
    hints: ["Sum wickets per player", "Order DESC and limit to 5"],
  },
  {
    id: "51",
    title: "Having Clause - High Earners",
    difficulty: "Medium",
    description: `Write a SQL query to find departments where average salary is above 70000.

### Expected Columns
- department
- avg_salary

### Example Output
| department | avg_salary |
|------------|------------|
| Engineering | 81400.0 |
| Finance | 81500.0 |
| Sales | 71000.0 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find high-paying departments\nSELECT department, \n",
    expectedQuerySQL: "SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 70000",
    tags: ["HAVING", "AVG", "GROUP BY"],
    hints: ["HAVING filters after GROUP BY", "Use HAVING for aggregate conditions"],
  },
  {
    id: "52",
    title: "Orders Above Average",
    difficulty: "Medium",
    description: `Write a SQL query to find orders with amount above the average order amount.

### Expected Columns
- id
- amount

### Example Output
| id | amount |
|----|--------|
| 1 | 76500.0 |
| 5 | 25000.0 |
| 7 | 75000.0 |
| 11 | 27500.0 |
| 15 | 76500.0 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find above-average orders\nSELECT id, amount FROM orders\nWHERE amount > \n",
    expectedQuerySQL: "SELECT id, amount FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)",
    tags: ["subquery", "AVG"],
    hints: ["Use a subquery to calculate average", "Compare amount to subquery result"],
  },
  {
    id: "53",
    title: "Second Highest Salary",
    difficulty: "Medium",
    description: `Write a SQL query to find the second highest salary in the company.

### Example Output
| second_highest |
|----------------|
| 90000 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find second highest salary\nSELECT ",
    expectedQuerySQL: "SELECT MAX(salary) as second_highest FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)",
    tags: ["subquery", "MAX"],
    hints: ["First find the max salary", "Then find max of remaining"],
  },
  {
    id: "54",
    title: "Products Never Ordered",
    difficulty: "Medium",
    description: `Write a SQL query to find products that have never been ordered.

### Expected Columns
- name
- category

### Example Output
| name | category |
|------|----------|
| Desk Lamp | Home |
| Water Bottle | Home |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find products never ordered\nSELECT name, category FROM products\nWHERE id NOT IN \n",
    expectedQuerySQL: "SELECT name, category FROM products WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)",
    tags: ["subquery", "NOT IN"],
    hints: ["Get ordered product IDs first", "Use NOT IN to find products not in that list"],
  },
  {
    id: "55",
    title: "Cities with Multiple Customers",
    difficulty: "Medium",
    description: `Write a SQL query to find cities with more than 1 customer.

### Expected Columns
- city
- customer_count

### Example Output
| city | customer_count |
|------|----------------|
| Mumbai | 2 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find cities with multiple customers\nSELECT city, \n",
    expectedQuerySQL: "SELECT city, COUNT(*) as customer_count FROM customers GROUP BY city HAVING COUNT(*) > 1",
    tags: ["GROUP BY", "HAVING", "COUNT"],
    hints: ["Group by city", "Use HAVING to filter groups"],
  },
  {
    id: "56",
    title: "Most Popular Products",
    difficulty: "Medium",
    description: `Write a SQL query to find the top 3 most frequently ordered products.

### Expected Columns
- product_name
- times_ordered

### Example Output
| product_name | times_ordered |
|--------------|---------------|
| Laptop Pro | 3 |
| Wireless Mouse | 3 |
| Office Chair | 2 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find most ordered products\nSELECT \n",
    expectedQuerySQL: "SELECT products.name as product_name, COUNT(order_items.id) as times_ordered FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.id, products.name ORDER BY times_ordered DESC LIMIT 3",
    orderMatters: true,
    tags: ["JOIN", "COUNT", "ORDER BY", "LIMIT"],
    hints: ["Join products with order_items", "Count and order by frequency"],
  },
  {
    id: "57",
    title: "Students with All Subjects",
    difficulty: "Medium",
    description: `Write a SQL query to find students who have marks in exactly 3 subjects.

### Expected Columns
- student_name
- subject_count

### Example Output
| student_name | subject_count |
|--------------|---------------|
| Ishaan Malhotra | 3 |
| Tanya Bose | 3 |
| ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Find students with 3 subjects\nSELECT \n",
    expectedQuerySQL: "SELECT students.name as student_name, COUNT(DISTINCT marks.subject_id) as subject_count FROM students JOIN marks ON students.id = marks.student_id GROUP BY students.id, students.name HAVING COUNT(DISTINCT marks.subject_id) = 3",
    tags: ["JOIN", "COUNT", "HAVING"],
    hints: ["Count distinct subjects per student", "Use HAVING to filter for exactly 3"],
  },
  {
    id: "58",
    title: "Experienced Doctors",
    difficulty: "Medium",
    description: `Write a SQL query to find doctors with more than 10 years of experience and their total appointment count.

### Expected Columns
- doctor_name
- experience_years
- total_appointments

### Example Output
| doctor_name | experience_years | total_appointments |
|-------------|------------------|-------------------|
| Dr. Arun Chatterjee | 15 | 3 |
| Dr. Rakesh Sinha | 20 | 3 |
| ... | ... | ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Find experienced doctors\nSELECT \n",
    expectedQuerySQL: "SELECT doctors.name as doctor_name, doctors.experience_years, COUNT(appointments.id) as total_appointments FROM doctors JOIN appointments ON doctors.id = appointments.doctor_id WHERE doctors.experience_years > 10 GROUP BY doctors.id, doctors.name, doctors.experience_years",
    tags: ["JOIN", "WHERE", "COUNT", "GROUP BY"],
    hints: ["Filter doctors first by experience", "Then count their appointments"],
  },
  {
    id: "59",
    title: "Popular Book Authors",
    difficulty: "Medium",
    description: `Write a SQL query to find authors whose books have been borrowed more than once.

### Expected Columns
- author
- borrow_count

### Example Output
| author | borrow_count |
|--------|--------------|
| R.K. Narayan | 3 |
| A.P.J. Abdul Kalam | 2 |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Find popular authors\nSELECT \n",
    expectedQuerySQL: "SELECT books.author, COUNT(borrowings.id) as borrow_count FROM books JOIN borrowings ON books.id = borrowings.book_id GROUP BY books.author HAVING COUNT(borrowings.id) > 1",
    tags: ["JOIN", "COUNT", "GROUP BY", "HAVING"],
    hints: ["Join books with borrowings", "Group by author and filter by count"],
  },
  {
    id: "60",
    title: "Category Revenue",
    difficulty: "Medium",
    description: `Write a SQL query to calculate total revenue by product category.

### Expected Columns
- category
- total_revenue

### Example Output
| category | total_revenue |
|----------|---------------|
| Electronics | 234500 |
| Furniture | 42000 |
| ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate category revenue\nSELECT \n",
    expectedQuerySQL: "SELECT products.category, SUM(products.price * order_items.quantity) as total_revenue FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.category",
    tags: ["JOIN", "SUM", "GROUP BY", "arithmetic"],
    hints: ["Multiply price by quantity", "Sum up for each category"],
  },
  {
    id: "61",
    title: "Customers Without Orders",
    difficulty: "Medium",
    description: `Write a SQL query to find customers who haven't placed any orders using LEFT JOIN.

### Expected Columns
- name
- email

### Example Output
(No results - all customers have orders)`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find customers without orders\nSELECT \n",
    expectedQuerySQL: "SELECT customers.name, customers.email FROM customers LEFT JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL",
    tags: ["LEFT JOIN", "NULL"],
    hints: ["LEFT JOIN keeps all customers", "Check for NULL in orders.id"],
  },
  {
    id: "62",
    title: "Top Spenders by City",
    difficulty: "Medium",
    description: `Write a SQL query to find total spending by customer city.

### Expected Columns
- city
- total_spending

### Example Output
| city | total_spending |
|------|----------------|
| Mumbai | 83200.0 |
| Delhi | 83850.0 |
| ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate spending by city\nSELECT \n",
    expectedQuerySQL: "SELECT customers.city, SUM(orders.amount) as total_spending FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.city",
    tags: ["JOIN", "SUM", "GROUP BY"],
    hints: ["Join customers with orders", "Sum amounts and group by city"],
  },
  {
    id: "63",
    title: "Monthly Order Count",
    difficulty: "Medium",
    description: `Write a SQL query to count orders placed each month in 2023.

### Expected Columns
- month
- order_count

### Example Output
| month | order_count |
|-------|-------------|
| 01 | 2 |
| 02 | 2 |
| 03 | 3 |
| 04 | 4 |
| 05 | 2 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Count orders by month\nSELECT \n",
    expectedQuerySQL: "SELECT SUBSTR(order_date, 6, 2) as month, COUNT(*) as order_count FROM orders GROUP BY SUBSTR(order_date, 6, 2) ORDER BY month",
    orderMatters: true,
    tags: ["SUBSTR", "GROUP BY", "dates"],
    hints: ["Use SUBSTR to extract month", "SUBSTR(date, 6, 2) gets month portion"],
  },
  {
    id: "64",
    title: "Team Total Runs",
    difficulty: "Medium",
    description: `Write a SQL query to find total runs scored by each IPL team.

### Expected Columns
- team_name
- total_runs

### Example Output
| team_name | total_runs |
|-----------|------------|
| Mumbai Indians | 188 |
| Chennai Super Kings | 83 |
| ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Calculate team runs\nSELECT \n",
    expectedQuerySQL: "SELECT teams.name as team_name, SUM(match_stats.runs_scored) as total_runs FROM teams JOIN players ON teams.id = players.team_id JOIN match_stats ON players.id = match_stats.player_id GROUP BY teams.id, teams.name",
    tags: ["JOIN", "SUM", "GROUP BY", "multiple tables"],
    hints: ["Join teams, players, and match_stats", "Sum runs per team"],
  },
  {
    id: "65",
    title: "Active Borrowers",
    difficulty: "Medium",
    description: `Write a SQL query to find members who currently have borrowed books (status = 'Borrowed').

### Expected Columns
- member_name
- books_borrowed

### Example Output
| member_name | books_borrowed |
|-------------|----------------|
| Rajan Iyer | 2 |
| Parvati Devi | 2 |
| Meghna Roy | 1 |
| Sudhir Mishra | 1 |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Find active borrowers\nSELECT \n",
    expectedQuerySQL: "SELECT members.name as member_name, COUNT(borrowings.id) as books_borrowed FROM members JOIN borrowings ON members.id = borrowings.member_id WHERE borrowings.status = 'Borrowed' GROUP BY members.id, members.name",
    tags: ["JOIN", "WHERE", "COUNT", "GROUP BY"],
    hints: ["Filter for status = 'Borrowed'", "Count books per member"],
  },
  {
    id: "66",
    title: "High-Value Transactions",
    difficulty: "Medium",
    description: `Write a SQL query to find all debit transactions above 10000.

### Expected Columns
- holder_name
- amount
- description

### Example Output
| holder_name | amount | description |
|-------------|--------|-------------|
| Vijay Anand | 15000 | Rent Payment |
| Narayan Murthy | 75000 | Supplier Payment |
| ... | ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Find high-value debits\nSELECT \n",
    expectedQuerySQL: "SELECT accounts.holder_name, transactions.amount, transactions.description FROM accounts JOIN transactions ON accounts.id = transactions.account_id WHERE transactions.transaction_type = 'Debit' AND transactions.amount > 10000",
    tags: ["JOIN", "WHERE", "AND"],
    hints: ["Join accounts with transactions", "Filter for Debit and amount > 10000"],
  },
  {
    id: "67",
    title: "Menu Items per Restaurant",
    difficulty: "Medium",
    description: `Write a SQL query to count menu items available at each restaurant.

### Expected Columns
- restaurant_name
- item_count

### Example Output
| restaurant_name | item_count |
|-----------------|------------|
| Tandoori Nights | 3 |
| Dakshin Delight | 3 |
| ... | ... |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Count menu items\nSELECT \n",
    expectedQuerySQL: "SELECT restaurants.name as restaurant_name, COUNT(menu_items.id) as item_count FROM restaurants JOIN menu_items ON restaurants.id = menu_items.restaurant_id GROUP BY restaurants.id, restaurants.name",
    tags: ["JOIN", "COUNT", "GROUP BY"],
    hints: ["Join restaurants with menu_items", "Count items per restaurant"],
  },
  {
    id: "68",
    title: "Average Item Price by Category",
    difficulty: "Medium",
    description: `Write a SQL query to find average menu item price by category.

### Expected Columns
- category
- avg_price

### Example Output
| category | avg_price |
|----------|-----------|
| Main Course | 245.71 |
| Bread | 60.0 |
| ... | ... |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Calculate average price by category\nSELECT \n",
    expectedQuerySQL: "SELECT category, ROUND(AVG(price), 2) as avg_price FROM menu_items GROUP BY category",
    tags: ["AVG", "GROUP BY", "ROUND"],
    hints: ["Group menu items by category", "Use ROUND for cleaner output"],
  },
  {
    id: "69",
    title: "Patient Age Groups",
    difficulty: "Medium",
    description: `Write a SQL query to count patients in different age groups: Under 40, 40-55, Over 55.

### Expected Columns
- age_group
- patient_count

### Example Output
| age_group | patient_count |
|-----------|---------------|
| Under 40 | 5 |
| 40-55 | 5 |
| Over 55 | 2 |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Count patients by age group\nSELECT \n",
    expectedQuerySQL: "SELECT CASE WHEN age < 40 THEN 'Under 40' WHEN age <= 55 THEN '40-55' ELSE 'Over 55' END as age_group, COUNT(*) as patient_count FROM patients GROUP BY CASE WHEN age < 40 THEN 'Under 40' WHEN age <= 55 THEN '40-55' ELSE 'Over 55' END",
    tags: ["CASE", "GROUP BY"],
    hints: ["Use CASE to create age groups", "Group by the CASE expression"],
  },
  {
    id: "70",
    title: "Subject-wise Top Scorer",
    difficulty: "Medium",
    description: `Write a SQL query to find the highest marks in each subject.

### Expected Columns
- subject_name
- max_marks

### Example Output
| subject_name | max_marks |
|--------------|-----------|
| Mathematics | 95 |
| Physics | 92 |
| Chemistry | 94 |
| ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Find top marks per subject\nSELECT \n",
    expectedQuerySQL: "SELECT subjects.name as subject_name, MAX(marks.marks) as max_marks FROM subjects JOIN marks ON subjects.id = marks.subject_id GROUP BY subjects.id, subjects.name",
    tags: ["JOIN", "MAX", "GROUP BY"],
    hints: ["Join subjects with marks", "Use MAX to find highest in each subject"],
  },
  {
    id: "71",
    title: "Repeat Customers",
    difficulty: "Medium",
    description: `Write a SQL query to find customers who have placed more than 2 orders.

### Expected Columns
- customer_name
- order_count

### Example Output
| customer_name | order_count |
|---------------|-------------|
| Rajesh Kumar | 3 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find repeat customers\nSELECT \n",
    expectedQuerySQL: "SELECT customers.name as customer_name, COUNT(orders.id) as order_count FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.id, customers.name HAVING COUNT(orders.id) > 2",
    tags: ["JOIN", "COUNT", "HAVING"],
    hints: ["Join and count orders per customer", "Use HAVING for the > 2 condition"],
  },
  {
    id: "72",
    title: "Branch-wise Deposits",
    difficulty: "Medium",
    description: `Write a SQL query to find total credits received at each branch.

### Expected Columns
- branch
- total_deposits

### Example Output
| branch | total_deposits |
|--------|----------------|
| Mumbai Main | 50000 |
| Chennai Central | 35000 |
| ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Calculate deposits by branch\nSELECT \n",
    expectedQuerySQL: "SELECT accounts.branch, SUM(transactions.amount) as total_deposits FROM accounts JOIN transactions ON accounts.id = transactions.account_id WHERE transactions.transaction_type = 'Credit' GROUP BY accounts.branch",
    tags: ["JOIN", "SUM", "WHERE", "GROUP BY"],
    hints: ["Join accounts with transactions", "Filter credits and group by branch"],
  },
  {
    id: "73",
    title: "All-Rounders Performance",
    difficulty: "Medium",
    description: `Write a SQL query to find all-rounders (runs > 0 AND wickets > 0 in any match).

### Expected Columns
- player_name
- total_runs
- total_wickets

### Example Output
| player_name | total_runs | total_wickets |
|-------------|------------|---------------|
| Ravindra Jadeja | 38 | 2 |
| Andre Russell | 65 | 1 |
| Sunil Narine | 28 | 4 |
| Axar Patel | 22 | 3 |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Find all-rounders\nSELECT \n",
    expectedQuerySQL: "SELECT players.name as player_name, SUM(match_stats.runs_scored) as total_runs, SUM(match_stats.wickets_taken) as total_wickets FROM players JOIN match_stats ON players.id = match_stats.player_id WHERE players.role = 'All-rounder' GROUP BY players.id, players.name",
    tags: ["JOIN", "SUM", "WHERE", "GROUP BY"],
    hints: ["Filter players by role", "Sum both runs and wickets"],
  },
  {
    id: "74",
    title: "Order Status Summary",
    difficulty: "Medium",
    description: `Write a SQL query to count orders and total amount for each status.

### Expected Columns
- status
- order_count
- total_amount

### Example Output
| status | order_count | total_amount |
|--------|-------------|--------------|
| Delivered | 9 | 110200.0 |
| Shipped | 3 | 44200.0 |
| Processing | 3 | 156800.0 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Summarize by status\nSELECT \n",
    expectedQuerySQL: "SELECT status, COUNT(*) as order_count, SUM(amount) as total_amount FROM orders GROUP BY status",
    tags: ["COUNT", "SUM", "GROUP BY"],
    hints: ["Group by order status", "Use both COUNT and SUM"],
  },
  {
    id: "75",
    title: "Genre-wise Book Availability",
    difficulty: "Medium",
    description: `Write a SQL query to find total copies available by genre.

### Expected Columns
- genre
- total_copies

### Example Output
| genre | total_copies |
|-------|--------------|
| Fiction | 19 |
| History | 5 |
| ... | ... |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Calculate copies by genre\nSELECT \n",
    expectedQuerySQL: "SELECT genre, SUM(copies_available) as total_copies FROM books GROUP BY genre",
    tags: ["SUM", "GROUP BY"],
    hints: ["Sum copies_available by genre", "Simple GROUP BY query"],
  },

  // ===== HARD QUESTIONS (76-100) =====
  {
    id: "76",
    title: "Employees Earning Above Department Average",
    difficulty: "Hard",
    description: `Write a SQL query to find employees who earn more than their department's average salary.

### Expected Columns
- name
- department
- salary
- dept_avg

### Example Output
| name | department | salary | dept_avg |
|------|------------|--------|----------|
| Aarav Sharma | Engineering | 85000 | 81400.0 |
| Karthik Sundaram | Engineering | 95000 | 81400.0 |
| ... | ... | ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Find above-average earners per department\n",
    expectedQuerySQL: "SELECT e.name, e.department, e.salary, d.dept_avg FROM employees e JOIN (SELECT department, AVG(salary) as dept_avg FROM employees GROUP BY department) d ON e.department = d.department WHERE e.salary > d.dept_avg",
    tags: ["subquery", "JOIN", "AVG"],
    hints: ["Create a subquery for department averages", "Join employees with the subquery", "Compare individual salary to department average"],
  },
  {
    id: "77",
    title: "Cumulative Order Amount",
    difficulty: "Hard",
    description: `Write a SQL query to show each order with a running total of amounts.

### Expected Columns
- id
- order_date
- amount
- running_total

### Example Output
| id | order_date | amount | running_total |
|----|------------|--------|---------------|
| 1 | 2023-01-20 | 76500.0 | 76500.0 |
| 2 | 2023-01-25 | 8850.0 | 85350.0 |
| 3 | 2023-02-01 | 4500.0 | 89850.0 |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate running total\nSELECT id, order_date, amount,\n",
    expectedQuerySQL: "SELECT id, order_date, amount, SUM(amount) OVER (ORDER BY order_date, id) as running_total FROM orders ORDER BY order_date, id",
    orderMatters: true,
    tags: ["window function", "SUM OVER"],
    hints: ["Use window function SUM() OVER()", "ORDER BY inside OVER() defines running order"],
  },
  {
    id: "78",
    title: "Rank Employees by Salary",
    difficulty: "Hard",
    description: `Write a SQL query to rank employees by salary within each department.

### Expected Columns
- name
- department
- salary
- dept_rank

### Example Output
| name | department | salary | dept_rank |
|------|------------|--------|-----------|
| Karthik Sundaram | Engineering | 95000 | 1 |
| Ananya Singh | Engineering | 90000 | 2 |
| Aarav Sharma | Engineering | 85000 | 3 |
| ... | ... | ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Rank employees within departments\nSELECT name, department, salary,\n",
    expectedQuerySQL: "SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank FROM employees ORDER BY department, dept_rank",
    orderMatters: true,
    tags: ["window function", "RANK", "PARTITION BY"],
    hints: ["Use RANK() window function", "PARTITION BY department for per-dept ranking"],
  },
  {
    id: "79",
    title: "Top Customer per City",
    difficulty: "Hard",
    description: `Write a SQL query to find the customer who spent the most in each city.

### Expected Columns
- city
- customer_name
- total_spent

### Example Output
| city | customer_name | total_spent |
|------|---------------|-------------|
| Ahmedabad | Geeta Patel | 1150.0 |
| Bangalore | Amit Sharma | 5300.0 |
| ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find top customer per city\n",
    expectedQuerySQL: "SELECT city, customer_name, total_spent FROM (SELECT customers.city, customers.name as customer_name, SUM(orders.amount) as total_spent, RANK() OVER (PARTITION BY customers.city ORDER BY SUM(orders.amount) DESC) as rnk FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.city, customers.id, customers.name) ranked WHERE rnk = 1 ORDER BY city",
    orderMatters: true,
    tags: ["window function", "RANK", "subquery"],
    hints: ["First calculate total per customer", "Rank within each city", "Filter for rank = 1"],
  },
  {
    id: "80",
    title: "Products with Revenue Above Average",
    difficulty: "Hard",
    description: `Write a SQL query to find products whose total revenue exceeds the average product revenue.

### Expected Columns
- product_name
- total_revenue

### Example Output
| product_name | total_revenue |
|--------------|---------------|
| Laptop Pro | 225000 |
| Standing Desk | 50000 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find above-average revenue products\n",
    expectedQuerySQL: "SELECT products.name as product_name, SUM(products.price * order_items.quantity) as total_revenue FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.id, products.name HAVING SUM(products.price * order_items.quantity) > (SELECT AVG(product_revenue) FROM (SELECT SUM(products.price * order_items.quantity) as product_revenue FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.id))",
    tags: ["subquery", "HAVING", "aggregation"],
    hints: ["Calculate revenue per product", "Calculate average revenue across products", "Use HAVING with subquery"],
  },
  {
    id: "81",
    title: "Students Above Class Average",
    difficulty: "Hard",
    description: `Write a SQL query to find students who scored above their class average in Mathematics.

### Expected Columns
- student_name
- class
- marks
- class_avg

### Example Output
| student_name | class | marks | class_avg |
|--------------|-------|-------|-----------|
| Ishaan Malhotra | 10 | 92 | 80.4 |
| Shreya Pillai | 10 | 95 | 80.4 |
| ... | ... | ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Find students above class average in Math\n",
    expectedQuerySQL: "SELECT s.name as student_name, s.class, m.marks, ca.class_avg FROM students s JOIN marks m ON s.id = m.student_id JOIN subjects sub ON m.subject_id = sub.id JOIN (SELECT students.class, AVG(marks.marks) as class_avg FROM students JOIN marks ON students.id = marks.student_id JOIN subjects ON marks.subject_id = subjects.id WHERE subjects.name = 'Mathematics' GROUP BY students.class) ca ON s.class = ca.class WHERE sub.name = 'Mathematics' AND m.marks > ca.class_avg",
    tags: ["subquery", "multiple JOINs", "AVG"],
    hints: ["Create subquery for class averages in Math", "Join students, marks, subjects", "Compare individual marks to class average"],
  },
  {
    id: "82",
    title: "Month-over-Month Growth",
    difficulty: "Hard",
    description: `Write a SQL query to calculate month-over-month order amount growth.

### Expected Columns
- month
- total_amount
- prev_month_amount
- growth

### Example Output
| month | total_amount | prev_month_amount | growth |
|-------|--------------|-------------------|--------|
| 2023-01 | 85350.0 | NULL | NULL |
| 2023-02 | 29200.0 | 85350.0 | -65.79 |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate month-over-month growth\n",
    expectedQuerySQL: "SELECT month, total_amount, LAG(total_amount) OVER (ORDER BY month) as prev_month_amount, ROUND((total_amount - LAG(total_amount) OVER (ORDER BY month)) * 100.0 / LAG(total_amount) OVER (ORDER BY month), 2) as growth FROM (SELECT SUBSTR(order_date, 1, 7) as month, SUM(amount) as total_amount FROM orders GROUP BY SUBSTR(order_date, 1, 7)) monthly ORDER BY month",
    orderMatters: true,
    tags: ["window function", "LAG", "growth calculation"],
    hints: ["Use LAG() to get previous month value", "Calculate percentage change", "Aggregate by month first"],
  },
  {
    id: "83",
    title: "Doctor Revenue Report",
    difficulty: "Hard",
    description: `Write a SQL query to calculate total consultation revenue for each doctor.

### Expected Columns
- doctor_name
- specialization
- total_patients
- total_revenue

### Example Output
| doctor_name | specialization | total_patients | total_revenue |
|-------------|----------------|----------------|---------------|
| Dr. Arun Chatterjee | Cardiology | 3 | 4500 |
| Dr. Rakesh Sinha | Neurology | 3 | 6000 |
| ... | ... | ... | ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Calculate doctor revenue\n",
    expectedQuerySQL: "SELECT doctors.name as doctor_name, doctors.specialization, COUNT(appointments.id) as total_patients, COUNT(appointments.id) * doctors.consultation_fee as total_revenue FROM doctors JOIN appointments ON doctors.id = appointments.doctor_id WHERE appointments.status = 'Completed' GROUP BY doctors.id, doctors.name, doctors.specialization, doctors.consultation_fee",
    tags: ["JOIN", "COUNT", "arithmetic", "GROUP BY"],
    hints: ["Join doctors with completed appointments", "Revenue = count * consultation_fee"],
  },
  {
    id: "84",
    title: "Active vs Returned Books",
    difficulty: "Hard",
    description: `Write a SQL query to create a summary showing borrowed vs returned books by genre.

### Expected Columns
- genre
- currently_borrowed
- returned

### Example Output
| genre | currently_borrowed | returned |
|-------|--------------------|----------|
| Fiction | 2 | 2 |
| History | 1 | 0 |
| ... | ... | ... |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Summarize borrowing status by genre\n",
    expectedQuerySQL: "SELECT books.genre, SUM(CASE WHEN borrowings.status IN ('Borrowed', 'Overdue') THEN 1 ELSE 0 END) as currently_borrowed, SUM(CASE WHEN borrowings.status = 'Returned' THEN 1 ELSE 0 END) as returned FROM books JOIN borrowings ON books.id = borrowings.book_id GROUP BY books.genre",
    tags: ["CASE", "SUM", "conditional aggregation"],
    hints: ["Use CASE WHEN for conditional counting", "Sum the CASE expressions for each category"],
  },
  {
    id: "85",
    title: "Customer Segmentation",
    difficulty: "Hard",
    description: `Write a SQL query to segment customers based on total spending: Premium (>50000), Standard (10000-50000), Basic (<10000).

### Expected Columns
- segment
- customer_count
- total_revenue

### Example Output
| segment | customer_count | total_revenue |
|---------|----------------|---------------|
| Premium | 4 | 319850.0 |
| Standard | 3 | 39700.0 |
| Basic | 3 | 10650.0 |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Segment customers by spending\n",
    expectedQuerySQL: "SELECT CASE WHEN total > 50000 THEN 'Premium' WHEN total >= 10000 THEN 'Standard' ELSE 'Basic' END as segment, COUNT(*) as customer_count, SUM(total) as total_revenue FROM (SELECT customer_id, SUM(amount) as total FROM orders GROUP BY customer_id) customer_totals GROUP BY CASE WHEN total > 50000 THEN 'Premium' WHEN total >= 10000 THEN 'Standard' ELSE 'Basic' END",
    tags: ["CASE", "subquery", "segmentation"],
    hints: ["First calculate total per customer", "Use CASE to assign segments", "Group by the segment"],
  },
  {
    id: "86",
    title: "Top Performing Batsmen per Team",
    difficulty: "Hard",
    description: `Write a SQL query to find the top scorer from each IPL team.

### Expected Columns
- team_name
- player_name
- total_runs

### Example Output
| team_name | player_name | total_runs |
|-----------|-------------|------------|
| Chennai Super Kings | MS Dhoni | 45 |
| Delhi Capitals | David Warner | 95 |
| ... | ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Find top scorer per team\n",
    expectedQuerySQL: "SELECT team_name, player_name, total_runs FROM (SELECT teams.name as team_name, players.name as player_name, SUM(match_stats.runs_scored) as total_runs, RANK() OVER (PARTITION BY teams.id ORDER BY SUM(match_stats.runs_scored) DESC) as rnk FROM teams JOIN players ON teams.id = players.team_id JOIN match_stats ON players.id = match_stats.player_id GROUP BY teams.id, teams.name, players.id, players.name) ranked WHERE rnk = 1 ORDER BY team_name",
    orderMatters: true,
    tags: ["window function", "RANK", "PARTITION BY"],
    hints: ["Sum runs per player", "Rank within each team", "Filter for top rank"],
  },
  {
    id: "87",
    title: "Transaction Balance Validation",
    difficulty: "Hard",
    description: `Write a SQL query to verify account balances by calculating credits minus debits.

### Expected Columns
- holder_name
- current_balance
- calculated_balance
- difference

### Example Output
| holder_name | current_balance | calculated_balance | difference |
|-------------|-----------------|--------------------| -----------|
| Vijay Anand | 125000.5 | 30000 | 95000.5 |
| ... | ... | ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Validate account balances\n",
    expectedQuerySQL: "SELECT a.holder_name, a.balance as current_balance, COALESCE(SUM(CASE WHEN t.transaction_type = 'Credit' THEN t.amount ELSE -t.amount END), 0) as calculated_balance, a.balance - COALESCE(SUM(CASE WHEN t.transaction_type = 'Credit' THEN t.amount ELSE -t.amount END), 0) as difference FROM accounts a LEFT JOIN transactions t ON a.id = t.account_id GROUP BY a.id, a.holder_name, a.balance",
    tags: ["CASE", "COALESCE", "LEFT JOIN", "aggregation"],
    hints: ["Use CASE to handle credit/debit differently", "LEFT JOIN to include accounts without transactions", "COALESCE handles NULL values"],
  },
  {
    id: "88",
    title: "Dense Rank Salaries",
    difficulty: "Hard",
    description: `Write a SQL query to assign dense ranks to unique salaries company-wide.

### Expected Columns
- name
- salary
- salary_rank

### Example Output
| name | salary | salary_rank |
|------|--------|-------------|
| Karthik Sundaram | 95000 | 1 |
| Ananya Singh | 90000 | 2 |
| Aarav Sharma | 85000 | 3 |
| Aditya Verma | 85000 | 3 |
| ... | ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Assign dense ranks to salaries\nSELECT name, salary,\n",
    expectedQuerySQL: "SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) as salary_rank FROM employees ORDER BY salary DESC, name",
    orderMatters: true,
    tags: ["window function", "DENSE_RANK"],
    hints: ["DENSE_RANK doesn't skip numbers for ties", "Order by salary descending"],
  },
  {
    id: "89",
    title: "Consecutive Order Days",
    difficulty: "Hard",
    description: `Write a SQL query to find the date range (first and last order date) for each customer.

### Expected Columns
- customer_name
- first_order
- last_order
- days_as_customer

### Example Output
| customer_name | first_order | last_order | days_as_customer |
|---------------|-------------|------------|------------------|
| Rajesh Kumar | 2023-01-20 | 2023-04-20 | 90 |
| Sunita Devi | 2023-01-25 | 2023-03-10 | 44 |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find customer order date ranges\n",
    expectedQuerySQL: "SELECT customers.name as customer_name, MIN(orders.order_date) as first_order, MAX(orders.order_date) as last_order, JULIANDAY(MAX(orders.order_date)) - JULIANDAY(MIN(orders.order_date)) as days_as_customer FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.id, customers.name ORDER BY days_as_customer DESC",
    orderMatters: true,
    tags: ["MIN", "MAX", "date functions", "JULIANDAY"],
    hints: ["Use MIN and MAX for date range", "JULIANDAY converts date to number for subtraction"],
  },
  {
    id: "90",
    title: "Percentile Ranking",
    difficulty: "Hard",
    description: `Write a SQL query to calculate percentile rank for each employee's salary.

### Expected Columns
- name
- salary
- percentile

### Example Output
| name | salary | percentile |
|------|--------|------------|
| Karthik Sundaram | 95000 | 100.0 |
| Ananya Singh | 90000 | 92.86 |
| ... | ... | ... |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Calculate salary percentiles\nSELECT name, salary,\n",
    expectedQuerySQL: "SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 2) as percentile FROM employees ORDER BY salary DESC",
    orderMatters: true,
    tags: ["window function", "PERCENT_RANK"],
    hints: ["PERCENT_RANK gives percentile position", "Multiply by 100 for percentage"],
  },
  {
    id: "91",
    title: "Cross-Category Sales",
    difficulty: "Hard",
    description: `Write a SQL query to find customers who have ordered from at least 2 different product categories.

### Expected Columns
- customer_name
- categories_ordered

### Example Output
| customer_name | categories_ordered |
|---------------|-------------------|
| Rajesh Kumar | 2 |
| Sunita Devi | 2 |
| ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Find customers with multiple categories\n",
    expectedQuerySQL: "SELECT customers.name as customer_name, COUNT(DISTINCT products.category) as categories_ordered FROM customers JOIN orders ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id GROUP BY customers.id, customers.name HAVING COUNT(DISTINCT products.category) >= 2",
    tags: ["multiple JOINs", "COUNT DISTINCT", "HAVING"],
    hints: ["Join all four tables", "Count distinct categories per customer"],
  },
  {
    id: "92",
    title: "Restaurant Performance Index",
    difficulty: "Hard",
    description: `Write a SQL query to calculate a performance index: (avg_rating * review_count) / avg_cost_for_two * 100.

### Expected Columns
- restaurant_name
- performance_index

### Example Output
| restaurant_name | performance_index |
|-----------------|-------------------|
| Hyderabadi House | 100.0 |
| Tandoori Nights | 75.0 |
| ... | ... |`,
    datasetSQL: restaurantDataset,
    starterSQL: "-- Calculate performance index\n",
    expectedQuerySQL: "SELECT restaurants.name as restaurant_name, ROUND(AVG(reviews.rating) * COUNT(reviews.id) / restaurants.avg_cost_for_two * 100, 2) as performance_index FROM restaurants JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id, restaurants.name, restaurants.avg_cost_for_two ORDER BY performance_index DESC",
    orderMatters: true,
    tags: ["JOIN", "arithmetic", "complex formula"],
    hints: ["Calculate each component first", "Apply the formula in SELECT"],
  },
  {
    id: "93",
    title: "Subject Pass Rate",
    difficulty: "Hard",
    description: `Write a SQL query to calculate pass rate (marks >= 70) for each subject.

### Expected Columns
- subject_name
- total_students
- passed
- pass_rate

### Example Output
| subject_name | total_students | passed | pass_rate |
|--------------|----------------|--------|-----------|
| Mathematics | 15 | 14 | 93.33 |
| Physics | 10 | 8 | 80.0 |
| ... | ... | ... | ... |`,
    datasetSQL: studentsDataset,
    starterSQL: "-- Calculate subject pass rates\n",
    expectedQuerySQL: "SELECT subjects.name as subject_name, COUNT(marks.id) as total_students, SUM(CASE WHEN marks.marks >= 70 THEN 1 ELSE 0 END) as passed, ROUND(SUM(CASE WHEN marks.marks >= 70 THEN 1 ELSE 0 END) * 100.0 / COUNT(marks.id), 2) as pass_rate FROM subjects JOIN marks ON subjects.id = marks.subject_id GROUP BY subjects.id, subjects.name",
    tags: ["CASE", "conditional aggregation", "percentage"],
    hints: ["Use CASE to count passes", "Calculate percentage from counts"],
  },
  {
    id: "94",
    title: "Moving Average Orders",
    difficulty: "Hard",
    description: `Write a SQL query to calculate 3-order moving average for order amounts.

### Expected Columns
- id
- order_date
- amount
- moving_avg

### Example Output
| id | order_date | amount | moving_avg |
|----|------------|--------|------------|
| 1 | 2023-01-20 | 76500.0 | 76500.0 |
| 2 | 2023-01-25 | 8850.0 | 42675.0 |
| 3 | 2023-02-01 | 4500.0 | 29950.0 |
| ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Calculate 3-order moving average\nSELECT id, order_date, amount,\n",
    expectedQuerySQL: "SELECT id, order_date, amount, ROUND(AVG(amount) OVER (ORDER BY order_date, id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) as moving_avg FROM orders ORDER BY order_date, id",
    orderMatters: true,
    tags: ["window function", "moving average", "ROWS BETWEEN"],
    hints: ["Use AVG with window frame", "ROWS BETWEEN defines the window size"],
  },
  {
    id: "95",
    title: "Diagnosis Frequency",
    difficulty: "Hard",
    description: `Write a SQL query to find the most common diagnosis and its frequency.

### Expected Columns
- diagnosis
- frequency
- percentage

### Example Output
| diagnosis | frequency | percentage |
|-----------|-----------|------------|
| Hypertension | 1 | 9.09 |
| Follow-up | 1 | 9.09 |
| ... | ... | ... |`,
    datasetSQL: hospitalDataset,
    starterSQL: "-- Find diagnosis frequency\n",
    expectedQuerySQL: "SELECT diagnosis, COUNT(*) as frequency, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM appointments WHERE diagnosis IS NOT NULL), 2) as percentage FROM appointments WHERE diagnosis IS NOT NULL GROUP BY diagnosis ORDER BY frequency DESC",
    orderMatters: true,
    tags: ["COUNT", "subquery", "percentage"],
    hints: ["Count each diagnosis", "Calculate percentage using total count in subquery"],
  },
  {
    id: "96",
    title: "Overdue Fine Calculation",
    difficulty: "Hard",
    description: `Write a SQL query to calculate hypothetical overdue fines (Rs. 5 per day for overdue books).

### Expected Columns
- member_name
- book_title
- days_overdue
- fine_amount

### Example Output
| member_name | book_title | days_overdue | fine_amount |
|-------------|------------|--------------|-------------|
| Vidya Lakshmi | The Argumentative Indian | 1 | 5 |`,
    datasetSQL: libraryDataset,
    starterSQL: "-- Calculate overdue fines\n",
    expectedQuerySQL: "SELECT members.name as member_name, books.title as book_title, 1 as days_overdue, 5 as fine_amount FROM borrowings JOIN members ON borrowings.member_id = members.id JOIN books ON borrowings.book_id = books.id WHERE borrowings.status = 'Overdue'",
    tags: ["JOIN", "calculated fields"],
    hints: ["Join all tables", "Filter for overdue status"],
  },
  {
    id: "97",
    title: "Account Type Summary",
    difficulty: "Hard",
    description: `Write a SQL query to create a comprehensive summary by account type.

### Expected Columns
- account_type
- num_accounts
- total_balance
- avg_balance
- max_balance

### Example Output
| account_type | num_accounts | total_balance | avg_balance | max_balance |
|--------------|--------------|---------------|-------------|-------------|
| Savings | 6 | 534502.0 | 89083.67 | 180000.0 |
| Current | 2 | 1250000.0 | 625000.0 | 750000.0 |
| ... | ... | ... | ... | ... |`,
    datasetSQL: bankDataset,
    starterSQL: "-- Create account type summary\n",
    expectedQuerySQL: "SELECT account_type, COUNT(*) as num_accounts, SUM(balance) as total_balance, ROUND(AVG(balance), 2) as avg_balance, MAX(balance) as max_balance FROM accounts GROUP BY account_type",
    tags: ["multiple aggregations", "GROUP BY"],
    hints: ["Use multiple aggregate functions", "All in one GROUP BY query"],
  },
  {
    id: "98",
    title: "Player Impact Score",
    difficulty: "Hard",
    description: `Write a SQL query to calculate player impact: (runs * 1) + (wickets * 25) + (catches * 10).

### Expected Columns
- player_name
- team_name
- impact_score

### Example Output
| player_name | team_name | impact_score |
|-------------|-----------|--------------|
| Sunil Narine | Kolkata Knight Riders | 148 |
| Virat Kohli | Royal Challengers | 132 |
| ... | ... | ... |`,
    datasetSQL: cricketDataset,
    starterSQL: "-- Calculate player impact scores\n",
    expectedQuerySQL: "SELECT players.name as player_name, teams.name as team_name, SUM(match_stats.runs_scored) + SUM(match_stats.wickets_taken) * 25 + SUM(match_stats.catches) * 10 as impact_score FROM players JOIN teams ON players.team_id = teams.id JOIN match_stats ON players.id = match_stats.player_id GROUP BY players.id, players.name, teams.name ORDER BY impact_score DESC",
    orderMatters: true,
    tags: ["JOIN", "arithmetic", "weighted formula"],
    hints: ["Sum each stat", "Apply weights in the formula"],
  },
  {
    id: "99",
    title: "Year-over-Year Comparison",
    difficulty: "Hard",
    description: `Write a SQL query to compare employee counts hired in each year.

### Expected Columns
- hire_year
- employees_hired

### Example Output
| hire_year | employees_hired |
|-----------|-----------------|
| 2016 | 1 |
| 2017 | 1 |
| 2018 | 2 |
| 2019 | 3 |
| 2020 | 3 |
| 2021 | 2 |
| 2022 | 2 |
| 2023 | 1 |`,
    datasetSQL: employeesDataset,
    starterSQL: "-- Count employees by hire year\n",
    expectedQuerySQL: "SELECT SUBSTR(hire_date, 1, 4) as hire_year, COUNT(*) as employees_hired FROM employees GROUP BY SUBSTR(hire_date, 1, 4) ORDER BY hire_year",
    orderMatters: true,
    tags: ["SUBSTR", "GROUP BY", "date extraction"],
    hints: ["Extract year from hire_date", "SUBSTR(date, 1, 4) gets year"],
  },
  {
    id: "100",
    title: "Complete Order Analysis",
    difficulty: "Hard",
    description: `Write a comprehensive SQL query combining customers, orders, and products to show customer spending details.

### Expected Columns
- customer_name
- city
- total_orders
- total_items
- total_spent
- avg_order_value

### Example Output
| customer_name | city | total_orders | total_items | total_spent | avg_order_value |
|---------------|------|--------------|-------------|-------------|-----------------|
| Rajesh Kumar | Mumbai | 3 | 4 | 83200.0 | 27733.33 |
| Sunita Devi | Delhi | 2 | 3 | 83850.0 | 41925.0 |
| ... | ... | ... | ... | ... | ... |`,
    datasetSQL: ordersDataset,
    starterSQL: "-- Complete order analysis\n",
    expectedQuerySQL: "SELECT customers.name as customer_name, customers.city, COUNT(DISTINCT orders.id) as total_orders, SUM(order_items.quantity) as total_items, SUM(orders.amount) / COUNT(DISTINCT orders.id) * COUNT(DISTINCT orders.id) as total_spent, ROUND(SUM(orders.amount) / COUNT(DISTINCT orders.id), 2) as avg_order_value FROM customers JOIN orders ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id GROUP BY customers.id, customers.name, customers.city ORDER BY total_spent DESC",
    orderMatters: true,
    tags: ["multiple JOINs", "multiple aggregations", "complex query"],
    hints: ["Join all three tables", "Use DISTINCT for accurate counts", "Multiple aggregations in one query"],
  },
]

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id)
}

export function getNextQuestion(currentId: string): Question | undefined {
  const currentIndex = questions.findIndex((q) => q.id === currentId)
  if (currentIndex === -1 || currentIndex === questions.length - 1) return undefined
  return questions[currentIndex + 1]
}

export function getPreviousQuestion(currentId: string): Question | undefined {
  const currentIndex = questions.findIndex((q) => q.id === currentId)
  if (currentIndex <= 0) return undefined
  return questions[currentIndex - 1]
}
