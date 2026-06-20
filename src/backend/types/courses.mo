import Common "common";

module {
  public type Lesson = {
    id : Common.LessonId;
    courseId : Common.CourseId;
    title : Text;
    description : Text;
    videoUrl : Text;
    durationMinutes : Nat;
    order : Nat;
  };

  public type Course = {
    id : Common.CourseId;
    title : Text;
    description : Text;
    instructorName : Text;
    thumbnailUrl : Text;
    lessons : [Lesson];
  };

  public type LessonProgress = {
    userId : Text;
    lessonId : Common.LessonId;
    completedAt : ?Common.Timestamp;
  };
};
