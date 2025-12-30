import React, { useState } from "react";

const TeacherProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://i.pinimg.com/1200x/d9/21/b4/d921b4bddc2bcd42a4f5f170a9d5da42.jpg"
  );
  const [isExporting, setIsExporting] = useState(false);

  // Teacher data
  const teacherData = {
    name: "Dr. Sara Khan",
    title: "Associate Professor · Computer Science",
    bio: "Dedicated educator with 12+ years of experience in computer science education. Specialized in algorithms, data structures, and database management systems.",
    employeeId: "EMP-CS-1247",
    department: "Computer Science",
    joinDate: "Sep 15, 2011",
    reportsTo: "Dr. Ahmed Raza",
    fullName: "Dr. Sara Khan",
    dateOfBirth: "June 15, 1982",
    gender: "Female",
    nationality: "Afghan",
    email: "sara.khan@academy.edu",
    phone: "+93 700 123 456",
    officeLocation: "CS Building, Room 302",
    officeHours: "Mon-Wed 2:00 PM - 4:00 PM",
    highestDegree: "Ph.D. in Computer Science",
    fields: "English Instructor",
    courses: [
      {
        code: "CS-201",
        name: "Data Structures",
        students: 120,
        schedule: "Mon-Wed 09:00-10:30",
        room: "CS-101",
      },
      {
        code: "CS-301",
        name: "Algorithms",
        students: 95,
        schedule: "Tue-Thu 11:00-12:30",
        room: "CS-203",
      },
      {
        code: "CS-202L",
        name: "DBMS Lab",
        students: 30,
        schedule: "Fri 14:00-16:00",
        room: "Lab-3",
      },
    ],
    stats: {
      yearsExp: 12,
      courses: 3,
      students: 245,
      rating: 4.8,
    },
  };

  const handleOpenEditModal = () => {
    alert("Edit profile modal would open here");
  };

  const handleEditPersonalInfo = () => {
    alert("Edit personal information modal would open here");
  };

  const handleEditContactInfo = () => {
    alert("Edit contact information modal would open here");
  };

  const handleEditAcademicInfo = () => {
    alert("Edit academic information modal would open here");
  };

  const handleAddCourse = () => {
    alert("Add course modal would open here");
  };

  const handleExportProfile = () => {
    setIsExporting(true);

    setTimeout(() => {
      alert("Profile exported successfully!");
      setIsExporting(false);
    }, 1500);
  };

  const handleAvatarClick = () => {
    const newAvatar = prompt(
      "Enter new avatar URL:",
      "https://i.pravatar.cc/150?img=15"
    );
    if (newAvatar && newAvatar.trim() !== "") {
      setAvatarUrl(newAvatar.trim());
      alert("Profile picture updated!");
    }
  };

  return (
    <div className="main-content">
      <div className="profile-container">
        {/* Profile Sidebar with integrated stats */}
        <aside className="profile-sidebar">
          <div className="profile-header">
            <img
              src={avatarUrl}
              alt="Dr. Sara Khan"
              className="profile-avatar"
              id="profileAvatar"
              onClick={handleAvatarClick}
              style={{ cursor: "pointer" }}
            />
            <h2 className="profile-name">{teacherData.name}</h2>
            <p className="profile-title">{teacherData.title}</p>
            <p className="profile-bio">{teacherData.bio}</p>
          </div>

          {/* Stats integrated into sidebar */}
          <div className="sidebar-stats">
            <h3>
              <i className="fas fa-chart-line"></i> Quick Stats
            </h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <span className="stat-value">{teacherData.stats.yearsExp}</span>
                <span className="stat-label">Years Exp</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-book"></i>
                </div>
                <span className="stat-value">{teacherData.stats.courses}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <span className="stat-value">{teacherData.stats.students}</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <span className="stat-value">{teacherData.stats.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="quick-info">
            <h3>
              <i className="fas fa-info-circle"></i> Quick Info
            </h3>
            <div className="info-item">
              <i className="fas fa-id-card"></i>
              <div className="info-content">
                <h4>Employee ID</h4>
                <p>{teacherData.employeeId}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-building"></i>
              <div className="info-content">
                <h4>Department</h4>
                <p>{teacherData.department}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-calendar-check"></i>
              <div className="info-content">
                <h4>Join Date</h4>
                <p>{teacherData.joinDate}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-user-tie"></i>
              <div className="info-content">
                <h4>Reports To</h4>
                <p>{teacherData.reportsTo}</p>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary" onClick={handleOpenEditModal}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>
            <button
              className="btn btn-outline"
              onClick={handleExportProfile}
              disabled={isExporting}
            >
              <i
                className={`fas ${
                  isExporting ? "fa-spinner fa-spin" : "fa-download"
                }`}
              ></i>
              {isExporting ? "Exporting..." : "Export"}
            </button>
          </div>
        </aside>

        {/* Profile Main Content */}
        <main className="profile-main">
          {/* Personal Information */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fas fa-user-circle"></i> Personal Information
              </h3>
              <button
                className="edit-btn"
                onClick={handleEditPersonalInfo}
                aria-label="Edit Personal Info"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-label">Full Name</div>
                <div className="info-value">{teacherData.fullName}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Date of Birth</div>
                <div className="info-value">{teacherData.dateOfBirth}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Gender</div>
                <div className="info-value">{teacherData.gender}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Nationality</div>
                <div className="info-value">{teacherData.nationality}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fas fa-address-book"></i> Contact Information
              </h3>
              <button
                className="edit-btn"
                onClick={handleEditContactInfo}
                aria-label="Edit Contact Info"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-content">
                  <h4>Email Address</h4>
                  <p>{teacherData.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-content">
                  <h4>Phone Number</h4>
                  <p>{teacherData.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-content">
                  <h4>Office Location</h4>
                  <p>{teacherData.officeLocation}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-content">
                  <h4>Office Hours</h4>
                  <p>{teacherData.officeHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Courses */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fas fa-book-open"></i> Current Courses
              </h3>
              <button
                className="edit-btn"
                onClick={handleAddCourse}
                aria-label="Add Course"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Students</th>
                    <th>Schedule</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherData.courses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.students}</td>
                      <td>{course.schedule}</td>
                      <td>{course.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Information */}
          <div className="section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fas fa-graduation-cap"></i> Academic Information
              </h3>
              <button
                className="edit-btn"
                onClick={handleEditAcademicInfo}
                aria-label="Edit Academic Info"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-label">Fields</div>
                <div className="info-value">{teacherData.fields}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Highest Degree</div>
                <div className="info-value">{teacherData.highestDegree}</div>
              </div>
            </div>
          </div>
        </main>

        <style jsx>{`
          /* Teacher Profile Page Specific Styles */
          .main-content {
            padding: 20px;
            min-height: 100vh;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 1.5rem;
            min-height: 80px;
            background: var(--white);
            border-radius: var(--card-radius);
            box-shadow: var(--shadow);
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            font-weight: 700;
            color: var(--primary);
          }

          .brand i {
            font-size: 28px;
          }

          .header-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--dark);
          }

          .header-right {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .header-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            cursor: pointer;
            border: 3px solid var(--primary-light);
          }

          /* Profile Container */
          .profile-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }

          @media (max-width: 768px) {
            .profile-container {
              grid-template-columns: 1fr;
            }
          }

          /* Profile Sidebar with integrated stats */
          .profile-sidebar {
            background: var(--white);
            border-radius: var(--card-radius);
            padding: 30px;
            box-shadow: var(--shadow);
            height: fit-content;
            position: sticky;
            top: 20px;
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .profile-header {
            text-align: center;
            padding-bottom: 25px;
            border-bottom: 2px solid var(--gray-light);
          }

          .profile-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid var(--primary-light);
            margin: 0 auto 20px;
            box-shadow: var(--shadow-lg);
            cursor: pointer;
            transition: var(--transition);
          }

          .profile-avatar:hover {
            transform: scale(1.05);
          }

          .profile-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
            color: var(--dark);
            line-height: 1.3;
          }

          .profile-title {
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 16px;
          }

          .profile-bio {
            color: var(--gray);
            font-size: 14px;
            line-height: 1.6;
            margin-top: 15px;
          }

          /* Stats integrated into sidebar */
          .sidebar-stats {
            background: var(--light);
            border-radius: var(--card-radius);
            padding: 20px;
            border: 1px solid var(--gray-light);
          }

          .sidebar-stats h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 15px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .stat-item {
            text-align: center;
            padding: 12px;
            background: var(--white);
            border-radius: 8px;
            transition: var(--transition);
            border: 1px solid var(--gray-light);
          }

          .stat-item:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
            border-color: var(--primary-light);
          }

          .stat-icon {
            width: 35px;
            height: 35px;
            border-radius: 8px;
            background: linear-gradient(
              135deg,
              var(--primary),
              var(--secondary)
            );
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            color: white;
            font-size: 16px;
          }

          .stat-value {
            font-size: 20px;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 3px;
            display: block;
          }

          .stat-label {
            font-size: 11px;
            color: var(--gray);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          /* Quick Info Card */
          .quick-info {
            background: var(--light);
            border-radius: var(--card-radius);
            padding: 20px;
            border: 1px solid var(--gray-light);
          }

          .quick-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 0;
            border-bottom: 1px solid var(--gray-light);
          }

          .info-item:last-child {
            border-bottom: none;
          }

          .info-item i {
            color: var(--primary);
            font-size: 16px;
            width: 24px;
          }

          .info-content h4 {
            margin: 0;
            font-size: 12px;
            color: var(--gray);
            font-weight: 500;
          }

          .info-content p {
            font-weight: 600;
            color: var(--dark);
          }

          /* Profile Main Content */
          .profile-main {
            background: var(--white);
            border-radius: var(--card-radius);
            padding: 30px;
            box-shadow: var(--shadow);
          }

          .section {
            margin-bottom: 30px;
            padding-bottom: 30px;
            border-bottom: 1px solid var(--gray-light);
          }

          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          }

          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--dark);
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .section-title i {
            color: var(--primary);
          }

          .edit-btn {
            background: var(--light);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
            color: var(--primary);
            border: none;
          }

          .edit-btn:hover {
            background: var(--primary);
            color: white;
            transform: rotate(90deg);
          }

          /* Info Grid */
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }

          .info-card {
            background: var(--light);
            border-radius: 10px;
            padding: 20px;
            transition: var(--transition);
            border-left: 3px solid var(--primary);
          }

          .info-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow);
          }

          .info-label {
            font-size: 12px;
            color: var(--gray);
            margin-bottom: 8px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .info-value {
            font-weight: 600;
            font-size: 16px;
            color: var(--dark);
          }

          /* Contact Info */
          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px;
            background: var(--light);
            border-radius: 8px;
            transition: var(--transition);
          }

          .contact-item:hover {
            background: var(--primary-light);
            transform: translateX(5px);
          }

          .contact-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 18px;
            flex-shrink: 0;
          }

          .contact-content h4 {
            font-size: 14px;
            margin-bottom: 3px;
            color: var(--gray);
          }

          .contact-content p {
            font-weight: 600;
            color: var(--dark);
          }

          /* Buttons */
          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: var(--transition);
            font-size: 14px;
            flex: 1;
            justify-content: center;
            font-family: inherit;
          }

          .btn-primary {
            background: var(--primary);
            color: white;
          }

          .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }

          .btn-outline {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
          }

          .btn-outline:hover {
            background: var(--primary);
            color: white;
          }

          .profile-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
          }

          /* Course Table */
          .table-container {
            background: var(--light);
            border-radius: 10px;
            overflow: hidden;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          thead {
            background: var(--primary);
            color: white;
          }

          th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }

          tbody tr {
            border-bottom: 1px solid var(--gray-light);
            transition: var(--transition);
          }

          tbody tr:hover {
            background: var(--primary-light);
          }

          td {
            padding: 15px;
            font-size: 14px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .main-content {
              padding: 15px;
            }

            .profile-container {
              grid-template-columns: 1fr;
            }

            .header {
              flex-direction: column;
              gap: 20px;
              padding: 1rem;
              text-align: center;
            }

            .profile-avatar {
              width: 120px;
              height: 120px;
            }

            .profile-name {
              font-size: 20px;
            }

            .profile-title {
              font-size: 14px;
            }

            .section-title {
              font-size: 18px;
            }

            .info-grid {
              grid-template-columns: 1fr;
            }

            .profile-actions {
              flex-direction: column;
            }

            .btn {
              width: 100%;
            }

            table {
              display: block;
              overflow-x: auto;
            }

            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 576px) {
            .header {
              border-radius: 8px;
              margin-bottom: 1rem;
            }

            .profile-name {
              font-size: 20px;
            }

            .profile-title {
              font-size: 14px;
            }

            .section-title {
              font-size: 18px;
            }

            .contact-item {
              flex-direction: column;
              text-align: center;
              gap: 10px;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TeacherProfile;
