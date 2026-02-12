import "./GuideCategories.scss";
import GuideCard from "../GuideCard/GuideCard";

interface Category {
  icon: string;
  title: string;
  description: string;
  items: string[];
  themeId?: string;
}

interface GuideCategoriesProps {
  title: string;
  categories: Category[];
}

function GuideCategories({ title, categories }: GuideCategoriesProps) {
  return (
    <section className="guide-categories">
      <h2>{title}</h2>
      <div className="guide-grid">
        {categories.map((category, index) => (
          <GuideCard
            key={index}
            icon={category.icon}
            title={category.title}
            description={category.description}
            items={category.items}
            themeId={category.themeId}
          />
        ))}
      </div>
    </section>
  );
}

export default GuideCategories;

