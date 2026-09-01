import ProjectIndex from "../components/ProjectIndex";
import { getProjectsWithMedia } from "../content/projectMedia";
import { projects } from "../content/projects";

export default function HomePage() {
  return <ProjectIndex projects={getProjectsWithMedia(projects)} />;
}
