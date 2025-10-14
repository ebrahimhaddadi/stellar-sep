import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./Browse.module.css";

interface FilterCriteria {
  category: string;
  headquarter: string;
  email: string;
  valueProposition: string;
  problem: string;
  solution: string;
  audience: string;
  context: string;
  price: string;
}

interface Item {
  id: string;
  name?: string;
  category: string;
  headquarter: string;
  email?: string;
  valueProposition?: string;
  problem?: string;
  solution?: string;
  audience: string;
  context?: string;
  mainFeatures?: string;
  price?: string;
  founderName?: string;
  startupStage?: string;
  minimumInvestment?: string;
  type: "software" | "startup";
}

const BrowsePage: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "software";

  const [filters, setFilters] = useState<FilterCriteria>({
    category: "",
    headquarter: "",
    email: "",
    valueProposition: "",
    problem: "",
    solution: "",
    audience: "",
    context: "",
    price: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [headquarters, setHeadquarters] = useState<string[]>([]);
  const [audiences, setAudiences] = useState<string[]>([]);

  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [type]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoint = type === "software" ? "software" : "startups";
      const response = await fetch(`http://localhost:3001/${endpoint}`);
      const data = await response.json();

      setAllItems(data);
      setFilteredItems(data);

      // Extract unique values for dropdowns
      const uniqueCategories = [
        ...new Set(data.map((item: Item) => item.category)),
      ];
      const uniqueHeadquarters = [
        ...new Set(data.map((item: Item) => item.headquarter)),
      ];
      const uniqueAudiences = [
        ...new Set(data.map((item: Item) => item.audience)),
      ];

      setCategories(uniqueCategories);
      setHeadquarters(uniqueHeadquarters);
      setAudiences(uniqueAudiences);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    let filtered = [...allItems];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((item) =>
        item.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.headquarter) {
      filtered = filtered.filter((item) =>
        item.headquarter
          ?.toLowerCase()
          .includes(filters.headquarter.toLowerCase())
      );
    }

    if (filters.audience) {
      filtered = filtered.filter((item) =>
        item.audience?.toLowerCase().includes(filters.audience.toLowerCase())
      );
    }

    // Advanced filters
    if (filters.email && type === "software") {
      filtered = filtered.filter((item) =>
        item.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.valueProposition) {
      filtered = filtered.filter((item) =>
        item.valueProposition
          ?.toLowerCase()
          .includes(filters.valueProposition.toLowerCase())
      );
    }

    if (filters.problem) {
      filtered = filtered.filter((item) =>
        item.problem?.toLowerCase().includes(filters.problem.toLowerCase())
      );
    }

    if (filters.solution) {
      filtered = filtered.filter((item) =>
        item.solution?.toLowerCase().includes(filters.solution.toLowerCase())
      );
    }

    if (filters.context) {
      filtered = filtered.filter((item) =>
        item.context?.toLowerCase().includes(filters.context.toLowerCase())
      );
    }

    if (filters.price && type === "software") {
      filtered = filtered.filter((item) =>
        item.price?.toLowerCase().includes(filters.price.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleReset = () => {
    setFilters({
      category: "",
      headquarter: "",
      email: "",
      valueProposition: "",
      problem: "",
      solution: "",
      audience: "",
      context: "",
      price: "",
    });
    setFilteredItems(allItems);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundGradient}></div>

      <div className={styles.mainContent}>
        <h1 className={styles.title}>
          {type === "software"
            ? lang === "ar"
              ? "استعراض البرمجيات"
              : "Browse Software"
            : lang === "ar"
            ? "استعراض الشركات الناشئة"
            : "Browse Startups"}
        </h1>

        <div className={styles.filterSection}>
          <div className={styles.filterForm}>
            <div className={styles.mainFiltersRow}>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>
                  {lang === "ar" ? "الفئة" : "Category"}
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="">
                    {lang === "ar" ? "جميع الفئات" : "All Categories"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterField}>
                <label className={styles.filterLabel}>
                  {lang === "ar" ? "المقر الرئيسي" : "Headquarter"}
                </label>
                <select
                  value={filters.headquarter}
                  onChange={(e) =>
                    handleFilterChange("headquarter", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="">
                    {lang === "ar" ? "جميع المواقع" : "All Locations"}
                  </option>
                  {headquarters.map((hq) => (
                    <option key={hq} value={hq}>
                      {hq}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterField}>
                <label className={styles.filterLabel}>
                  {lang === "ar" ? "الجمهور" : "Audience"}
                </label>
                <select
                  value={filters.audience}
                  onChange={(e) =>
                    handleFilterChange("audience", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="">
                    {lang === "ar" ? "جميع الجماهير" : "All Audiences"}
                  </option>
                  {audiences.map((aud) => (
                    <option key={aud} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={styles.toggleButton}
              >
                {showAdvancedFilters ? "−" : "+"}{" "}
                {lang === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
              </button>
            </div>

            {showAdvancedFilters && (
              <div className={styles.advancedFilters}>
                <div className={styles.filtersGrid}>
                  {type === "software" && (
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>
                        {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <input
                        type="text"
                        value={filters.email}
                        onChange={(e) =>
                          handleFilterChange("email", e.target.value)
                        }
                        placeholder={
                          lang === "ar"
                            ? "البحث بالبريد..."
                            : "Search by email..."
                        }
                        className={styles.filterInput}
                      />
                    </div>
                  )}

                  <div className={styles.filterField}>
                    <label className={styles.filterLabel}>
                      {lang === "ar" ? "قيمة العرض" : "Value Proposition"}
                    </label>
                    <input
                      type="text"
                      value={filters.valueProposition}
                      onChange={(e) =>
                        handleFilterChange("valueProposition", e.target.value)
                      }
                      placeholder={lang === "ar" ? "بحث..." : "Search..."}
                      className={styles.filterInput}
                    />
                  </div>

                  <div className={styles.filterField}>
                    <label className={styles.filterLabel}>
                      {lang === "ar" ? "المشكلة" : "Problem"}
                    </label>
                    <input
                      type="text"
                      value={filters.problem}
                      onChange={(e) =>
                        handleFilterChange("problem", e.target.value)
                      }
                      placeholder={lang === "ar" ? "بحث..." : "Search..."}
                      className={styles.filterInput}
                    />
                  </div>

                  <div className={styles.filterField}>
                    <label className={styles.filterLabel}>
                      {lang === "ar" ? "الحل" : "Solution"}
                    </label>
                    <input
                      type="text"
                      value={filters.solution}
                      onChange={(e) =>
                        handleFilterChange("solution", e.target.value)
                      }
                      placeholder={lang === "ar" ? "بحث..." : "Search..."}
                      className={styles.filterInput}
                    />
                  </div>

                  <div className={styles.filterField}>
                    <label className={styles.filterLabel}>
                      {lang === "ar" ? "السياق" : "Context"}
                    </label>
                    <input
                      type="text"
                      value={filters.context}
                      onChange={(e) =>
                        handleFilterChange("context", e.target.value)
                      }
                      placeholder={
                        lang === "ar"
                          ? "بحث بالسياق..."
                          : "Search by context..."
                      }
                      className={styles.filterInput}
                    />
                  </div>

                  {type === "software" && (
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>
                        {lang === "ar" ? "السعر" : "Price"}
                      </label>
                      <input
                        type="text"
                        value={filters.price}
                        onChange={(e) =>
                          handleFilterChange("price", e.target.value)
                        }
                        placeholder={
                          lang === "ar" ? "بحث بالسعر..." : "Search by price..."
                        }
                        className={styles.filterInput}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.actionButtons}>
              <button onClick={handleSearch} className={styles.searchButton}>
                {lang === "ar" ? "بحث" : "Search"}
              </button>
              <button onClick={handleReset} className={styles.resetButton}>
                {lang === "ar" ? "إعادة تعيين" : "Reset"}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={styles.itemsContainer}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {lang === "ar"
                ? `عدد النتائج: ${filteredItems.length}`
                : `Results: ${filteredItems.length}`}
            </span>
          </div>

          {loading ? (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className={styles.itemsGrid}>
              {filteredItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {item.name || item.category}
                  </h3>
                  <p className={styles.cardText}>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className={styles.cardText}>
                    <strong>Headquarter:</strong> {item.headquarter}
                  </p>
                  <p className={styles.cardText}>
                    <strong>Audience:</strong> {item.audience}
                  </p>
                  {type === "software" && (
                    <>
                      <p className={styles.cardText}>
                        <strong>Email:</strong> {item.email}
                      </p>
                      <p className={styles.cardText}>
                        <strong>Value Proposition:</strong>{" "}
                        {item.valueProposition}
                      </p>
                      {item.price && (
                        <p className={styles.cardText}>
                          <strong>Price:</strong> {item.price}
                        </p>
                      )}
                    </>
                  )}
                  {type === "startup" && (
                    <>
                      {item.founderName && (
                        <p className={styles.cardText}>
                          <strong>Founder:</strong> {item.founderName}
                        </p>
                      )}
                      {item.startupStage && (
                        <p className={styles.cardText}>
                          <strong>Stage:</strong> {item.startupStage}
                        </p>
                      )}
                      {item.minimumInvestment && (
                        <p className={styles.cardText}>
                          <strong>Min Investment:</strong>{" "}
                          {item.minimumInvestment}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              {lang === "ar" ? "لم يتم العثور على نتائج." : "No results found."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
