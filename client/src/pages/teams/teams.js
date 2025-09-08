// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchTeam } from "../../components/services";
// import "./teams.css"; // custom CSS file

// function TeamComponent() {
//   const theme = useSelector((state) => state.theme.theme); // light | dark
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [teamData, setTeamData] = useState();
//   const [loading, setLoading] = useState(true);

//   async function fetchingData() {
//     try {
//       const fetchedData = await fetchTeam();
//       setTeamData(fetchedData);
//     } catch (err) {
//       console.error("Error fetching team data:", err);
//       setTeamData([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchingData();
//   }, []);

//   const filteredData = teamData?.filter((member) => {
//     const matchesSearch =
//       member.name.toLowerCase().includes(search.toLowerCase()) ||
//       member.email.toLowerCase().includes(search.toLowerCase()) ||
//       member.phone.includes(search);

//     const matchesFilter = filter === "all" || member.access === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="team-container mx-4" data-theme={theme}>
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by name, email, or phone"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="filter-select"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All Roles</option>
//           <option value="admin">Admin</option>
//           <option value="manager">Manager</option>
//           <option value="user">User</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//           <p>Loading team members...</p>
//         </div>
//       ) : teamData && teamData.length > 0 ? (
//         <div className="table-responsive">
//           <table className="modern-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Age</th>
//                 <th>Phone</th>
//                 <th>Access</th>
//               </tr>
//             </thead>
//            <tbody>
//                 {filteredData.length > 0 ? (
//                     filteredData.map((member) => (
//                     <tr key={member._id}>
//                         <td data-label="Name">{member.name}</td>
//                         <td data-label="Email">{member.email}</td>
//                         <td data-label="Age">{member.age}</td>
//                         <td data-label="Phone">{member.phone}</td>
//                         <td data-label="Access">
//                         <span className={`role-badge ${member.access}`}>
//                            {member.access == "admin" ? <i className="bi ms-2 bi-person-fill-lock me-2"></i> : member.access=="manager"?  <i className="bi ms-2 bi-person-fill-gear me-2"></i>  : <i className="bi ms-2 bi-person-lines-fill me-2"></i>}   
//                            {member.access}
//                         </span>
//                         </td>
//                     </tr>
//                     ))
//                 ) : (
//                     <tr>
//                     <td colSpan="5" className="no-data">
//                         No matching records found
//                     </td>
//                     </tr>
//                 )}
//             </tbody>

//           </table>
//         </div>
//       ) : (
//         <p className="no-data">No team members available</p>
//       )}
//     </div>
//   );
// }

// export default TeamComponent;




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTeam } from "../../components/services";
import "./teams.css"; // custom CSS file

function TeamComponent() {
  const theme = useSelector((state) => state.theme.theme); // light | dark
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [teamData, setTeamData] = useState();
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 👈 adjust how many rows per page

  async function fetchingData() {
    try {
      const fetchedData = await fetchTeam();
      setTeamData(fetchedData);
    } catch (err) {
      console.error("Error fetching team data:", err);
      setTeamData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  const filteredData = teamData?.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.phone.includes(search);

    const matchesFilter = filter === "all" || member.access === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="team-container mx-4" data-theme={theme}>
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
        />

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // reset page when filtering
          }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading team members...</p>
        </div>
      ) : teamData && teamData.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((member) => (
                    <tr key={member._id}>
                      <td data-label="Name">{member.name}</td>
                      <td data-label="Email">{member.email}</td>
                      <td data-label="Age">{member.age}</td>
                      <td data-label="Phone">{member.phone}</td>
                      <td data-label="Access">
                        <span className={`role-badge ${member.access}`}>
                          {member.access === "admin" ? (
                            <i className="bi ms-2 bi-person-fill-lock me-2"></i>
                          ) : member.access === "manager" ? (
                            <i className="bi ms-2 bi-person-fill-gear me-2"></i>
                          ) : (
                            <i className="bi ms-2 bi-person-lines-fill me-2"></i>
                          )}
                          {member.access}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>

              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="no-data">No team members available</p>
      )}
    </div>
  );
}

export default TeamComponent;
