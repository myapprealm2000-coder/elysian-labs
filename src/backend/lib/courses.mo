import Map "mo:core/Map";
import List "mo:core/List";
import CourseTypes "../types/courses";
import Common "../types/common";

module {
  public type CourseMap = Map.Map<Common.CourseId, CourseTypes.Course>;
  public type ProgressList = List.List<CourseTypes.LessonProgress>;

  public func createCourse(
    courses : CourseMap,
    id : Common.CourseId,
    title : Text,
    description : Text,
    thumbnailUrl : Text,
    _now : Common.Timestamp,
  ) : CourseTypes.Course {
    let course : CourseTypes.Course = {
      id;
      title;
      description;
      instructorName = "Elysian AI";
      thumbnailUrl;
      lessons = [];
    };
    courses.add(id, course);
    course;
  };

  public func listCourses(courses : CourseMap) : [CourseTypes.Course] {
    courses.values().toArray();
  };

  public func getCourse(
    courses : CourseMap,
    id : Common.CourseId,
  ) : ?CourseTypes.Course {
    courses.get(id);
  };

  public func addLesson(
    courses : CourseMap,
    courseId : Common.CourseId,
    lesson : CourseTypes.Lesson,
  ) : Bool {
    switch (courses.get(courseId)) {
      case (?course) {
        let updated = { course with lessons = course.lessons.concat([lesson]) };
        courses.add(courseId, updated);
        true;
      };
      case null { false };
    };
  };

  public func markLessonComplete(
    progress : ProgressList,
    lessonId : Common.LessonId,
    userId : Text,
    now : Common.Timestamp,
  ) : Bool {
    // Check if already marked — if so, skip
    let existing = progress.find(func(p : CourseTypes.LessonProgress) : Bool {
      p.userId == userId and p.lessonId == lessonId
    });
    switch (existing) {
      case (?_) { false };
      case null {
        progress.add({
          userId;
          lessonId;
          completedAt = ?now;
        });
        true;
      };
    };
  };

  public func getLessonProgress(
    progress : ProgressList,
    userId : Text,
  ) : [CourseTypes.LessonProgress] {
    let filtered = progress.filter(func(p : CourseTypes.LessonProgress) : Bool {
      p.userId == userId
    });
    filtered.toArray();
  };
};
