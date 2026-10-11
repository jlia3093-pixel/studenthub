import { useState, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

// Student Data
const students = [
  { id: "810424104001", name: "ABARNA M" },
  { id: "810424104002", name: "ABISHEK RAJ R" },
  { id: "810424104003", name: "ADHAVANT S" },
  { id: "810424104004", name: "ADITHYAN N" },
  { id: "810424104005", name: "AJAY AARUMUGAM R" },
  { id: "810424104006", name: "AJAY K" },
  { id: "810424104007", name: "AJAY R" },
  { id: "810424104008", name: "AKASH R P" },
  { id: "810424104009", name: "ANANDH A" },
  { id: "810424104010", name: "ARSHATH AHAMED M" },
  { id: "810424104011", name: "ARUNKUMAR N" },
  { id: "810424104012", name: "ASWIN P" },
  { id: "810424104013", name: "ATHIYAMAN R" },
  { id: "810424104014", name: "BARATH R" },
  { id: "810424104015", name: "BAREEN SHIYALINI SI" },
  { id: "810424104016", name: "BHARATHI T" },
  { id: "810424104017", name: "BHUVANESHWARAN C" },
  { id: "810424104018", name: "BOOMATHI S" },
  { id: "810424104019", name: "CHIRATHI VISHNU" },
  { id: "810424104020", name: "DEEPAK S" },
  { id: "810424104021", name: "DEEPIKA K" },
  { id: "810424104022", name: "DEVADHARSHINI S" },
  { id: "810424104023", name: "DHANUSHIYAD" },
  { id: "810424104024", name: "DHARANI VENDHAN T" },
  { id: "810424104025", name: "DHARSHINI N" },
  { id: "810424104026", name: "DHARUNA R" },
  { id: "810424104027", name: "DHASARATHAN P" },
  { id: "810424104028", name: "DINESH V" },
  { id: "810424104029", name: "ELAVARASAN V" },
  { id: "810424104030", name: "FARJANA A" },
  { id: "810424104031", name: "FARUKKHAN S" },
  { id: "810424104032", name: "GOKUL S" },
  { id: "810424104033", name: "GOKULAPRIYAN S" },
  { id: "810424104034", name: "GOPI B" },
  { id: "810424104035", name: "GURU P" },
  { id: "810424104036", name: "HARIESH MATHESH M" },
  { id: "810424104037", name: "HARIHARAN A S" },
  { id: "810424104038", name: "HARINI N" },
  { id: "810424104039", name: "JAFRIN S" },
  { id: "810424104040", name: "JAI SHANTH R" },
  { id: "810424104041", name: "JAISANTHOSH S K" },
  { id: "810424104042", name: "JANANI M" },
  { id: "810424104043", name: "JAYABHARATHAN V" },
  { id: "810424104044", name: "JAYGUGANESH S" },
  { id: "810424104045", name: "JEEVA R" },
  { id: "810424104046", name: "JEEVA S" },
  { id: "810424104047", name: "JEGADEESH G" },
  { id: "810424104048", name: "JERELYN J" },
  { id: "810424104049", name: "JESHVIN M" },
  { id: "810424104050", name: "JEZZLIN QUEEN EZRA" },
  { id: "810424104051", name: "JOSHITA SAGANA C" },
  { id: "810424104052", name: "JOSHWA D" },
  { id: "810424104053", name: "JULIYA K" },
  { id: "810424104054", name: "KALAINIVANI N" },
  { id: "810424104055", name: "KARTHICK R" },
  { id: "810424104056", name: "KATHIR M" },
  { id: "810424104057", name: "KAVIBALA S" },
  { id: "810424104058", name: "KAVINRAJAN K" },
  { id: "810424104059", name: "KAVIYA G" },
  { id: "810424104060", name: "KAVIYA K" },
  { id: "810424104061", name: "KAVIYARASAN R" },
  { id: "810424104062", name: "KEERTHANA G" },
  { id: "810424104063", name: "KEERTHANA V" },
  { id: "810424104301", name: "ANNE JENNICA A" },
  { id: "810424104306", name: "HARSHA M" },
  { id: "810424104307", name: "KUNDAVAI NATCHIYAR R" },
  { id: "810424104309", name: "MUTHULAKSHMI" },
  { id: "810424104312", name: "SUBANISHA S" },
];

// Favourite Context
const FavouriteContext = createContext();

function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  function toggleFavourite(student) {
    setFavourites((previous) =>
      previous.some((item) => item.id === student.id)
        ? previous.filter((item) => item.id !== student.id)
        : [...previous, student]
    );
  }

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}

function useFavourites() {
  return useContext(FavouriteContext);
}

// Header
function Header() {
  const { favourites } = useFavourites();
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-icon">S</span>
        <span>StudentHub<small>STUDENT DIRECTORY</small></span>
      </Link>

      <nav>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Students
        </Link>
        <Link
          className={location.pathname === "/favourites" ? "active" : ""}
          to="/favourites"
        >
          Favourites <span className="badge">{favourites.length}</span>
        </Link>
      </nav>
    </header>
  );
}

// Student Card
function StudentCard({ student }) {
  const { favourites, toggleFavourite } = useFavourites();
  const isFavourite = favourites.some((item) => item.id === student.id);

  return (
    <article className="student-card">
      <div className="student-top">
        <div className="avatar">{student.name.charAt(0)}</div>
        <button
          className={`heart ${isFavourite ? "selected" : ""}`}
          onClick={() => toggleFavourite(student)}
          aria-label={isFavourite ? "Remove favourite" : "Add favourite"}
          title={isFavourite ? "Remove favourite" : "Add favourite"}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>

      <h3>{student.name}</h3>
      <p className="register-number">REG NO. {student.id}</p>

      <div className="student-tags">
        <span>CSE</span>
        <span>3rd Year</span>
      </div>

      <button
        className={`favourite-button ${isFavourite ? "remove-button" : ""}`}
        onClick={() => toggleFavourite(student)}
      >
        {isFavourite ? "♥ Added to Favourites" : "♡ Add to Favourites"}
      </button>
    </article>
  );
}

// Student List Page
function StudentList() {
  const [search, setSearch] = useState("");
  const { favourites } = useFavourites();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.includes(search.trim())
  );

  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">YOUR CLASS. YOUR COMMUNITY.</span>
          <h1>Meet your <span>classmates.</span></h1>
          <p>Explore your student community and save your favourite classmates.</p>
        </div>
        <div className="hero-symbol">✦</div>
      </section>

      <section className="stats">
        <div className="stat-box">
          <span className="stat-icon">♙</span>
          <div><strong>{students.length}</strong><p>Total Students</p></div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">♡</span>
          <div><strong>{favourites.length}</strong><p>My Favourites</p></div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⌘</span>
          <div><strong>CSE</strong><p>Department</p></div>
        </div>
      </section>

      <section className="directory">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CLASS DIRECTORY</span>
            <h2>All Students <span className="count">{filteredStudents.length}</span></h2>
          </div>
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search name or register number..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="student-grid">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>⌕</span>
            <h3>No students found</h3>
            <p>Try another name or register number.</p>
          </div>
        )}
      </section>
    </main>
  );
}

// Favourites Page
function Favourites() {
  const { favourites } = useFavourites();

  return (
    <main className="main-content">
      <section className="hero favourites-hero">
        <div className="hero-text">
          <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1>Your favourite <span>people.</span></h1>
          <p>All your saved classmates, together in one place.</p>
        </div>
        <div className="hero-symbol">♥</div>
      </section>

      <section className="directory">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SAVED STUDENTS</span>
            <h2>My Favourites <span className="count">{favourites.length}</span></h2>
          </div>
          <Link to="/" className="back-link">+ Browse Students</Link>
        </div>

        {favourites.length > 0 ? (
          <div className="student-grid">
            {favourites.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>♡</span>
            <h3>No favourites yet</h3>
            <p>Visit the Students page and tap “Add to Favourites”.</p>
            <Link to="/" className="primary-link">Explore Students</Link>
          </div>
        )}
      </section>
    </main>
  );
}

// Main App
function AppContent() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<StudentList />} />
      </Routes>
      <footer className="footer">
        <p>© 2026 StudentHub · Built with React</p>
        <span>CSE · 3rd Year</span>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <FavouriteProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </FavouriteProvider>
  );
}