import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import CourseTypes "../types/courses";
import Common "../types/common";
import CoursesLib "../lib/courses";

mixin (
  courses : Map.Map<Common.CourseId, CourseTypes.Course>,
  progress : List.List<CourseTypes.LessonProgress>,
) {

  public shared func createCourse(
    title : Text,
    description : Text,
    thumbnailUrl : Text,
  ) : async CourseTypes.Course {
    let now = Time.now();
    let id = now.toText();
    CoursesLib.createCourse(courses, id, title, description, thumbnailUrl, now);
  };

  public query func listCourses() : async [CourseTypes.Course] {
    CoursesLib.listCourses(courses);
  };

  public query func getCourse(id : Common.CourseId) : async ?CourseTypes.Course {
    CoursesLib.getCourse(courses, id);
  };

  public shared func addLesson(
    courseId : Common.CourseId,
    lessonId : Common.LessonId,
    title : Text,
    description : Text,
    videoUrl : Text,
    durationMinutes : Nat,
    order : Nat,
  ) : async Bool {
    let lesson : CourseTypes.Lesson = {
      id = lessonId;
      courseId;
      title;
      description;
      videoUrl;
      durationMinutes;
      order;
    };
    CoursesLib.addLesson(courses, courseId, lesson);
  };

  public shared func markLessonComplete(
    lessonId : Common.LessonId,
    userId : Text,
  ) : async Bool {
    let now = Time.now();
    CoursesLib.markLessonComplete(progress, lessonId, userId, now);
  };

  public query func getLessonProgress(userId : Text) : async [CourseTypes.LessonProgress] {
    CoursesLib.getLessonProgress(progress, userId);
  };
};
