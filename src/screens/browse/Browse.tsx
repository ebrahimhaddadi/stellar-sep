import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./Browse.module.css";

// Updated interfaces based on your data structure
interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  headquarter: string;
  email: string;
  valueProposition: string;
  problem: string;
  solution: string;
  audience: string;
  context: string;
  mainFeatures: string[];
  logo?: string;
  rating?: number;
  price?: string;
}

interface StartupItem {
  id: string;
  name: string;
  founderName: string;
  category: string;
  headquarter: string;
  stage: string;
  problem: string;
  solution: string;
  valueProposition: string;
  audience: string;
  context: string;
  minInvestment: string;
  logo?: string;
}

type Item = SoftwareItem | StartupItem;

const BrowsePage: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "software";

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, [type]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoint = type === "software" ? "/software" : "/startups";
      const response = await fetch(`http://localhost:3001${endpoint}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((item: any) => item.category)),
      ]
        .filter(Boolean) // Remove null/undefined
        .sort(); // Sort alphabetically

      setCategories(uniqueCategories);

      // Set all items
      setAllItems(data);
      setFilteredItems(data); // Initially show all items

      console.log("Loaded categories:", uniqueCategories);
      console.log("Loaded items:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllItems([]);
      setFilteredItems([]);
    }
    setLoading(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Auto-filter on selection change (optional)
    if (value) {
      const filtered = allItems.filter(
        (item) => item.category.toLowerCase() === value.toLowerCase()
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }
  };

  const handleSearch = () => {
    if (selectedCategory) {
      // Filter items based on selected category
      const filtered = allItems.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredItems(filtered);
    } else {
      // Show all items if no category is selected
      setFilteredItems(allItems);
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setFilteredItems(allItems);
  };

  // Type guard to check if item is startup
  const isStartupItem = (item: Item): item is StartupItem => {
    return "founderName" in item && "stage" in item;
  };

  // Type guard to check if item is software
  const isSoftwareItem = (item: Item): item is SoftwareItem => {
    return "mainFeatures" in item && !("founderName" in item);
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

        {/* Search Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <div className={styles.selectWrapper}>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={styles.categorySelect}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <option value="">
                  {lang === "ar" ? "اختر الفئة" : "Select Category"}
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <span className={styles.selectIcon}>▼</span>
            </div>

            <div className={styles.searchButtons}>
              <button
                onClick={handleSearch}
                className={styles.searchButton}
                disabled={!selectedCategory}
              >
                {lang === "ar" ? "بحث" : "Search"}
              </button>

              {selectedCategory && (
                <button onClick={handleReset} className={styles.resetButton}>
                  {lang === "ar" ? "إعادة تعيين" : "Reset"}
                </button>
              )}
            </div>
          </div>

          {/* Display selected category info */}
          {selectedCategory && (
            <div className={styles.filterInfo}>
              <span>
                {lang === "ar"
                  ? `الفئة المحددة: ${selectedCategory}`
                  : `Selected Category: ${selectedCategory}`}
              </span>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div className={styles.itemsContainer}>
          {loading ? (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
            </div>
          ) : (
            <>
              <div className={styles.resultsHeader}>
                <span className={styles.resultsCount}>
                  {lang === "ar"
                    ? `عرض ${filteredItems.length} من ${allItems.length} نتيجة`
                    : `Showing ${filteredItems.length} of ${allItems.length} results`}
                </span>
                {selectedCategory && (
                  <span className={styles.categoryTag}>
                    <strong>{selectedCategory}</strong>
                  </span>
                )}
              </div>

              <div className={styles.itemsGrid}>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>{item.name}</h3>
                        <span className={styles.cardBadge}>
                          {item.headquarter}
                        </span>
                      </div>

                      <div className={styles.cardContent}>
                        {/* Category Badge */}
                        <div className={styles.categoryBadgeWrapper}>
                          <span className={styles.categoryBadge}>
                            {item.category}
                          </span>
                        </div>

                        {/* Value Proposition */}
                        <div className={styles.cardSection}>
                          <h4 className={styles.sectionTitle}>
                            {lang === "ar"
                              ? "القيمة المقترحة"
                              : "Value Proposition"}
                          </h4>
                          <p className={styles.sectionText}>
                            {item.valueProposition}
                          </p>
                        </div>

                        {/* Problem */}
                        <div className={styles.cardSection}>
                          <h4 className={styles.sectionTitle}>
                            {lang === "ar" ? "المشكلة" : "Problem"}
                          </h4>
                          <p className={styles.sectionText}>{item.problem}</p>
                        </div>

                        {/* Solution */}
                        <div className={styles.cardSection}>
                          <h4 className={styles.sectionTitle}>
                            {lang === "ar" ? "الحل" : "Solution"}
                          </h4>
                          <p className={styles.sectionText}>{item.solution}</p>
                        </div>

                        {/* Metadata */}
                        <div className={styles.cardMeta}>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>
                              {lang === "ar" ? "الجمهور:" : "Audience:"}
                            </span>
                            <span className={styles.metaValue}>
                              {item.audience}
                            </span>
                          </div>

                          {/* Software specific fields */}
                          {isSoftwareItem(item) && (
                            <>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  {lang === "ar" ? "البريد:" : "Email:"}
                                </span>
                                <span className={styles.metaValue}>
                                  {item.email}
                                </span>
                              </div>
                              {item.price && (
                                <div className={styles.metaItem}>
                                  <span className={styles.metaLabel}>
                                    {lang === "ar" ? "السعر:" : "Price:"}
                                  </span>
                                  <span className={styles.metaValue}>
                                    {item.price}
                                  </span>
                                </div>
                              )}
                              {item.rating && (
                                <div className={styles.metaItem}>
                                  <span className={styles.metaLabel}>
                                    {lang === "ar" ? "التقييم:" : "Rating:"}
                                  </span>
                                  <span className={styles.metaValue}>
                                    {"⭐".repeat(Math.floor(item.rating))}{" "}
                                    {item.rating}
                                  </span>
                                </div>
                              )}
                            </>
                          )}

                          {/* Startup specific fields */}
                          {isStartupItem(item) && (
                            <>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  {lang === "ar" ? "المؤسس:" : "Founder:"}
                                </span>
                                <span className={styles.metaValue}>
                                  {item.founderName}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  {lang === "ar" ? "المرحلة:" : "Stage:"}
                                </span>
                                <span className={styles.metaValue}>
                                  {item.stage}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  {lang === "ar"
                                    ? "الاستثمار المطلوب:"
                                    : "Min Investment:"}
                                </span>
                                <span className={styles.metaValue}>
                                  {item.minInvestment}
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Main Features for Software */}
                        {isSoftwareItem(item) && item.mainFeatures && (
                          <div className={styles.featuresSection}>
                            <h4 className={styles.sectionTitle}>
                              {lang === "ar"
                                ? "الميزات الرئيسية"
                                : "Main Features"}
                            </h4>
                            <div className={styles.featuresList}>
                              {item.mainFeatures.map((feature, idx) => (
                                <span key={idx} className={styles.featureTag}>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Card Actions */}
                        <div className={styles.cardActions}>
                          <button className={styles.detailsButton}>
                            {lang === "ar" ? "عرض التفاصيل" : "View Details"}
                          </button>
                          <button className={styles.contactButton}>
                            {lang === "ar" ? "تواصل" : "Contact"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>🔍</div>
                    <h3>
                      {lang === "ar" ? "لا توجد نتائج" : "No results found"}
                    </h3>
                    <p>
                      {lang === "ar"
                        ? "جرب تغيير الفئة أو إزالة الفلاتر"
                        : "Try changing the category or removing filters"}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;

// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import styles from "./Browse.module.css";

// interface SoftwareItem {
//   id: string;
//   name: string;
//   category: string;
//   headquarter: string;
//   email: string;
//   valueProposition: string;
//   problem: string;
//   solution: string;
//   audience: string;
//   context: string;
//   mainFeatures: string[];
//   logo?: string;
//   rating?: number;
//   price?: string;
// }

// interface StartupItem {
//   id: string;
//   name: string;
//   founderName: string;
//   category: string;
//   headquarter: string;
//   stage: string;
//   problem: string;
//   solution: string;
//   valueProposition: string;
//   audience: string;
//   context: string;
//   minInvestment: string;
//   logo?: string;
// }

// type Item = SoftwareItem | StartupItem;

// interface FilterCriteria {
//   category: string;
//   headquarter: string;
//   email: string;
//   valueProposition: string;
//   problem: string;
//   solution: string;
//   audience: string;
//   context: string;
//   price: string;
// }

// const BrowsePage: React.FC = () => {
//   const { lang } = useParams<{ lang: string }>();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const type = queryParams.get("type") || "software";

//   // State for filters
//   const [filters, setFilters] = useState<FilterCriteria>({
//     category: "",
//     headquarter: "",
//     email: "",
//     valueProposition: "",
//     problem: "",
//     solution: "",
//     audience: "",
//     context: "",
//     price: "",
//   });

//   // State for dropdown options
//   const [categories, setCategories] = useState<any[]>([]);
//   const [headquarters, setHeadquarters] = useState<any[]>([]);
//   const [audiences, setAudiences] = useState<any[]>([]);

//   // State for data
//   const [allItems, setAllItems] = useState<Item[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   // Fetch all data on mount
//   useEffect(() => {
//     fetchAllData();
//   }, [type]);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       const endpoint = type === "software" ? "/software" : "/startups";
//       const response = await fetch(`http://localhost:3001${endpoint}`);

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();

//       // Extract unique values for dropdowns
//       const uniqueCategories = [
//         ...new Set(data.map((item: any) => item.category)),
//       ]
//         .filter(Boolean)
//         .sort();

//       const uniqueHeadquarters = [
//         ...new Set(data.map((item: any) => item.headquarter)),
//       ]
//         .filter(Boolean)
//         .sort();

//       const uniqueAudiences = [
//         ...new Set(data.map((item: any) => item.audience)),
//       ]
//         .filter(Boolean)
//         .sort();

//       setCategories(uniqueCategories);
//       setHeadquarters(uniqueHeadquarters);
//       setAudiences(uniqueAudiences);

//       setAllItems(data);
//       setFilteredItems(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setAllItems([]);
//       setFilteredItems([]);
//     }
//     setLoading(false);
//   };

//   const handleFilterChange = (field: keyof FilterCriteria, value: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSearch = () => {
//     let filtered = [...allItems];

//     // Apply each filter if it has a value
//     if (filters.category) {
//       filtered = filtered.filter(
//         (item) => item.category.toLowerCase() === filters.category.toLowerCase()
//       );
//     }

//     if (filters.headquarter) {
//       filtered = filtered.filter((item) =>
//         item.headquarter
//           .toLowerCase()
//           .includes(filters.headquarter.toLowerCase())
//       );
//     }

//     if (filters.audience) {
//       filtered = filtered.filter((item) =>
//         item.audience.toLowerCase().includes(filters.audience.toLowerCase())
//       );
//     }

//     if (filters.email) {
//       filtered = filtered.filter((item) => {
//         if ("email" in item) {
//           return (item as SoftwareItem).email
//             .toLowerCase()
//             .includes(filters.email.toLowerCase());
//         }
//         return false;
//       });
//     }

//     if (filters.valueProposition) {
//       filtered = filtered.filter((item) =>
//         item.valueProposition
//           .toLowerCase()
//           .includes(filters.valueProposition.toLowerCase())
//       );
//     }

//     if (filters.problem) {
//       filtered = filtered.filter((item) =>
//         item.problem.toLowerCase().includes(filters.problem.toLowerCase())
//       );
//     }

//     if (filters.solution) {
//       filtered = filtered.filter((item) =>
//         item.solution.toLowerCase().includes(filters.solution.toLowerCase())
//       );
//     }

//     if (filters.context) {
//       filtered = filtered.filter((item) =>
//         item.context.toLowerCase().includes(filters.context.toLowerCase())
//       );
//     }

//     if (filters.price && type === "software") {
//       filtered = filtered.filter((item) => {
//         if ("price" in item) {
//           return (item as SoftwareItem).price
//             ?.toLowerCase()
//             .includes(filters.price.toLowerCase());
//         }
//         return false;
//       });
//     }

//     setFilteredItems(filtered);
//   };

//   const handleReset = () => {
//     setFilters({
//       category: "",
//       headquarter: "",
//       email: "",
//       valueProposition: "",
//       problem: "",
//       solution: "",
//       audience: "",
//       context: "",
//       price: "",
//     });
//     setFilteredItems(allItems);
//   };

//   // Type guards
//   const isStartupItem = (item: Item): item is StartupItem => {
//     return "founderName" in item && "stage" in item;
//   };

//   const isSoftwareItem = (item: Item): item is SoftwareItem => {
//     return "mainFeatures" in item && !("founderName" in item);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.backgroundGradient}></div>

//       <div className={styles.mainContent}>
//         <h1 className={styles.title}>
//           {type === "software"
//             ? lang === "ar"
//               ? "استعراض البرمجيات"
//               : "Browse Software"
//             : lang === "ar"
//             ? "استعراض الشركات الناشئة"
//             : "Browse Startups"}
//         </h1>

//         {/* Filter Form Section */}
//         <div className={styles.filterSection}>
//           <div className={styles.filterForm}>
//             {/* Main Filters Row */}
//             <div className={styles.mainFiltersRow}>
//               {/* Category Select */}
//               <div className={styles.filterField}>
//                 <label className={styles.filterLabel}>
//                   {lang === "ar" ? "الفئة" : "Category"}
//                 </label>
//                 <select
//                   value={filters.category}
//                   onChange={(e) =>
//                     handleFilterChange("category", e.target.value)
//                   }
//                   className={styles.filterSelect}
//                 >
//                   <option value="">
//                     {lang === "ar" ? "جميع الفئات" : "All Categories"}
//                   </option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Headquarter Select */}
//               <div className={styles.filterField}>
//                 <label className={styles.filterLabel}>
//                   {lang === "ar" ? "المقر الرئيسي" : "Headquarter"}
//                 </label>
//                 <select
//                   value={filters.headquarter}
//                   onChange={(e) =>
//                     handleFilterChange("headquarter", e.target.value)
//                   }
//                   className={styles.filterSelect}
//                 >
//                   <option value="">
//                     {lang === "ar" ? "جميع المواقع" : "All Locations"}
//                   </option>
//                   {headquarters.map((hq) => (
//                     <option key={hq} value={hq}>
//                       {hq}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Audience Select */}
//               <div className={styles.filterField}>
//                 <label className={styles.filterLabel}>
//                   {lang === "ar" ? "الجمهور" : "Audience"}
//                 </label>
//                 <select
//                   value={filters.audience}
//                   onChange={(e) =>
//                     handleFilterChange("audience", e.target.value)
//                   }
//                   className={styles.filterSelect}
//                 >
//                   <option value="">
//                     {lang === "ar" ? "جميع الجماهير" : "All Audiences"}
//                   </option>
//                   {audiences.map((aud) => (
//                     <option key={aud} value={aud}>
//                       {aud}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Toggle Advanced Filters */}
//               <button
//                 type="button"
//                 onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//                 className={styles.toggleButton}
//               >
//                 {showAdvancedFilters ? "−" : "+"}
//                 {lang === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
//               </button>
//             </div>

//             {/* Advanced Filters (Collapsible) */}
//             {showAdvancedFilters && (
//               <div className={styles.advancedFilters}>
//                 <div className={styles.filtersGrid}>
//                   {/* Email Input */}
//                   {type === "software" && (
//                     <div className={styles.filterField}>
//                       <label className={styles.filterLabel}>
//                         {lang === "ar" ? "البريد الإلكتروني" : "Email"}
//                       </label>
//                       <input
//                         type="text"
//                         value={filters.email}
//                         onChange={(e) =>
//                           handleFilterChange("email", e.target.value)
//                         }
//                         placeholder={
//                           lang === "ar"
//                             ? "البحث بالبريد..."
//                             : "Search by email..."
//                         }
//                         className={styles.filterInput}
//                       />
//                     </div>
//                   )}

//                   {/* Value Proposition */}
//                   <div className={styles.filterField}>
//                     <label className={styles.filterLabel}>
//                       {lang === "ar" ? "القيمة المقترحة" : "Value Proposition"}
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.valueProposition}
//                       onChange={(e) =>
//                         handleFilterChange("valueProposition", e.target.value)
//                       }
//                       placeholder={
//                         lang === "ar"
//                           ? "البحث في القيمة..."
//                           : "Search in value..."
//                       }
//                       className={styles.filterInput}
//                     />
//                   </div>

//                   {/* Problem */}
//                   <div className={styles.filterField}>
//                     <label className={styles.filterLabel}>
//                       {lang === "ar" ? "المشكلة" : "Problem"}
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.problem}
//                       onChange={(e) =>
//                         handleFilterChange("problem", e.target.value)
//                       }
//                       placeholder={
//                         lang === "ar"
//                           ? "البحث في المشكلة..."
//                           : "Search in problem..."
//                       }
//                       className={styles.filterInput}
//                     />
//                   </div>

//                   {/* Solution */}
//                   <div className={styles.filterField}>
//                     <label className={styles.filterLabel}>
//                       {lang === "ar" ? "الحل" : "Solution"}
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.solution}
//                       onChange={(e) =>
//                         handleFilterChange("solution", e.target.value)
//                       }
//                       placeholder={
//                         lang === "ar"
//                           ? "البحث في الحل..."
//                           : "Search in solution..."
//                       }
//                       className={styles.filterInput}
//                     />
//                   </div>

//                   {/* Context */}
//                   <div className={styles.filterField}>
//                     <label className={styles.filterLabel}>
//                       {lang === "ar" ? "السياق" : "Context"}
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.context}
//                       onChange={(e) =>
//                         handleFilterChange("context", e.target.value)
//                       }
//                       placeholder={
//                         lang === "ar"
//                           ? "البحث في السياق..."
//                           : "Search in context..."
//                       }
//                       className={styles.filterInput}
//                     />
//                   </div>

//                   {/* Price (Software only) */}
//                   {type === "software" && (
//                     <div className={styles.filterField}>
//                       <label className={styles.filterLabel}>
//                         {lang === "ar" ? "السعر" : "Price"}
//                       </label>
//                       <input
//                         type="text"
//                         value={filters.price}
//                         onChange={(e) =>
//                           handleFilterChange("price", e.target.value)
//                         }
//                         placeholder={
//                           lang === "ar"
//                             ? "البحث بالسعر..."
//                             : "Search by price..."
//                         }
//                         className={styles.filterInput}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className={styles.actionButtons}>
//               <button onClick={handleSearch} className={styles.searchButton}>
//                 {lang === "ar" ? "بحث" : "Search"}
//               </button>

//               <button onClick={handleReset} className={styles.resetButton}>
//                 {lang === "ar" ? "إعادة تعيين" : "Reset"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className={styles.itemsContainer}>
//           {loading ? (
//             <div className={styles.loadingSpinner}>
//               <div className={styles.spinner}></div>
//             </div>
//           ) : (
//             <>
//               <div className={styles.resultsHeader}>
//                 <span className={styles.resultsCount}>
//                   {lang === "ar"
//                     ? `عرض ${filteredItems.length} من ${allItems.length} نتيجة`
//                     : `Showing ${filteredItems.length} of ${allItems.length} results`}
//                 </span>
//               </div>

//               <div className={styles.itemsGrid}>
//                 {filteredItems.length > 0 ? (
//                   filteredItems.map((item) => (
//                     <div key={item.id} className={styles.card}>
//                       {isSoftwareItem(item) && (
//                         <>
//                           <h3 className={styles.cardTitle}>{item.category}</h3>
//                           <p className={styles.cardText}>
//                             <strong>Email:</strong> {item.email}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>HQ:</strong> {item.headquarter}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Audience:</strong> {item.audience}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Problem:</strong> {item.problem}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Solution:</strong> {item.solution}
//                           </p>
//                           {item.price && (
//                             <p className={styles.cardText}>
//                               <strong>Price:</strong> {item.price}
//                             </p>
//                           )}
//                         </>
//                       )}
//                       {isStartupItem(item) && (
//                         <>
//                           <h3 className={styles.cardTitle}>{item.name}</h3>
//                           <p className={styles.cardText}>
//                             <strong>Founder:</strong> {item.founderName}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>HQ:</strong> {item.headquarter}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Stage:</strong> {item.stage}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Problem:</strong> {item.problem}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Solution:</strong> {item.solution}
//                           </p>
//                           <p className={styles.cardText}>
//                             <strong>Min Investment:</strong>{" "}
//                             {item.minInvestment}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className={styles.noResults}>
//                     {lang === "ar"
//                       ? "لم يتم العثور على نتائج"
//                       : "No results found"}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowsePage;
