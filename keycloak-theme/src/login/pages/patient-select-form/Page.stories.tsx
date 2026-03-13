import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "patient-select-form.ftl" });

const meta = {
    title: "login/patient-select-form.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

