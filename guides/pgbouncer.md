# PgBouncer

PgBouncer is a lightweight connection pooler for PostgreSQL, designed to manage connections efficiently. Here's a step-by-step guide on how to install and set up PgBouncer on an existing PostgreSQL database:

### 1. Install PgBouncer

#### **On Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install pgbouncer
```

#### **On CentOS/RHEL:**
```bash
sudo yum install pgbouncer
```

### 2. Configure PgBouncer

#### **Step 1: Edit the PgBouncer Configuration File**
The main configuration file for PgBouncer is typically located at `/etc/pgbouncer/pgbouncer.ini`.

- **Basic Configuration:**

  Open the configuration file:
  ```bash
  sudo nano /etc/pgbouncer/pgbouncer.ini
  ```

  Below is a sample configuration:

  ```ini
  [databases]
  mydatabase = host=localhost port=5432 dbname=mydatabase
  
  [pgbouncer]
  listen_addr = 127.0.0.1
  listen_port = 6432
  auth_type = md5
  auth_file = /etc/pgbouncer/userlist.txt
  admin_users = postgres
  pool_mode = session
  max_client_conn = 100
  default_pool_size = 20
  log_connections = 1
  log_disconnections = 1
  ```

  - `listen_addr`: Address PgBouncer listens on (e.g., `127.0.0.1` for local connections).
  - `listen_port`: Port PgBouncer listens on (default is `6432`).
  - `auth_type`: Authentication type (e.g., `md5`, `trust`, `hba`).
  - `auth_file`: Path to the file containing the user credentials.
  - `pool_mode`: Connection pooling mode (`session`, `transaction`, or `statement`).
  - `max_client_conn`: Maximum number of client connections.
  - `default_pool_size`: Number of server connections to keep in the pool.

#### **Step 2: Set Up Authentication**
Create the user authentication file (`userlist.txt`):

```bash
sudo nano /etc/pgbouncer/userlist.txt
```

Add the following line for the PostgreSQL user you want PgBouncer to authenticate:

```plaintext
"postgres" "md5<md5_hash_of_password>"
```

You can generate the MD5 hash using the following command in PostgreSQL:

```sql
SELECT 'md5' || md5('password' || 'username');
```

Replace `password` and `username` with your actual credentials.

#### **Step 3: Adjust PostgreSQL Settings**
Ensure that the `pg_hba.conf` file on your PostgreSQL server allows connections from PgBouncer:

```bash
# Example entry in pg_hba.conf
host    all             all             127.0.0.1/32            md5
```

Reload the PostgreSQL configuration:

```bash
sudo systemctl reload postgresql
```

### 3. Start and Enable PgBouncer

Start PgBouncer and enable it to start on boot:

```bash
sudo systemctl start pgbouncer
sudo systemctl enable pgbouncer
```

### 4. Test the Setup

To connect to the PostgreSQL database through PgBouncer, use the following command:

```bash
psql -h 127.0.0.1 -p 6432 -U postgres -d mydatabase
```

### 5. Monitor and Tune PgBouncer

- **Logs:** PgBouncer logs can be found in `/var/log/pgbouncer/pgbouncer.log`.
- **Statistics:** You can connect to PgBouncer's admin interface using `psql` to check connection statistics:

```bash
psql -h 127.0.0.1 -p 6432 -U postgres -d pgbouncer
```

Then, run:

```sql
SHOW POOLS;
```

This will show the current pool status.

### Additional Notes
- **Connection Pooling Modes:**
  - `session`: Each client gets a separate PostgreSQL connection for the duration of the session.
  - `transaction`: Each client gets a separate connection for each transaction.
  - `statement`: Each client gets a separate connection for each statement.

- **Security Considerations:** Ensure the `pgbouncer.ini` and `userlist.txt` files are only accessible by the user running PgBouncer (typically `postgres`).

With these steps, PgBouncer should be installed, configured, and ready to manage connections to your existing PostgreSQL database.