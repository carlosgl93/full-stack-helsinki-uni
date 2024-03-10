interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

type PartsListProps = {
  partsList: Array<CoursePart>;
};

export const PartsList = ({ partsList }: PartsListProps) => {
  return partsList.map((part, i) => {
    switch (part.kind) {
      case "basic":
        return (
          <>
            <b key={i}>
              {part.name} {part.exerciseCount}
            </b>
            <p>{part.description}</p>
          </>
        );
      case "group":
        return (
          <>
            <b key={i}>
              {part.name} {part.exerciseCount} {part.groupProjectCount}
            </b>
          </>
        );
      case "background":
        return (
          <>
            <b key={i}>
              {part.name} {part.exerciseCount} {part.backgroundMaterial}
            </b>
            <p>{part.description}</p>
          </>
        );
      case "special":
        return (
          <>
            <b key={i}>
              {part.name} {part.exerciseCount}
            </b>
            <p>{part.description}</p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </>
        );
    }
  });
};
