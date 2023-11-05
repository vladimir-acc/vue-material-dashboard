<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <md-card-header data-background-color="blue">
      <h4 class="title">Напрямок</h4>
    </md-card-header>
    <md-table v-model="typesOfCourses">

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single"
        @click="fetchCourses(item.id);fetchTerms(1);termsIsVisible=false; 
        courseTitle = item.title; corseId=item.id"
      >
        <md-table-cell md-label="">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="">
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id, item.title, 'types_of_courses')"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редагування</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <CoursEdit
      ref="CoursEdit"
      @typedit="fetchTypesCourses"
      @coursEdit="fetchCourses"
      @titleUpdate="titleUpdate"
    />
    <hr />
    <md-card-header data-background-color="green">
      <h4 class="title">Перелік курсів напрямку - <b>"{{ !courseTitle?"Психологія":courseTitle }}"</b></h4>
    </md-card-header>
    <md-table v-model="course">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single"
        @click="fetchTerms(item.id);termsIsVisible=true; title=item.title"
      >

        <md-table-cell md-label="">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="">
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id, item.title, 'course')"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редагування</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <hr />
    <transition name="fade">
      <div v-show="termsIsVisible">
        <md-card-header data-background-color="orange">
          <h4 class="title">Подробиці курсу - <b>"{{ title }}"</b></h4>
        </md-card-header>
        <md-table v-model="terms">
          <md-table-row
            slot="md-table-row"
            class="strong"
          >
            <md-table-cell>Тривалість</md-table-cell>
            <md-table-cell>Період</md-table-cell>
            <md-table-cell>Вартість</md-table-cell>
            <md-table-cell>Посилання</md-table-cell>
            <md-table-cell>Подія</md-table-cell>
          </md-table-row>
          <md-table-row slot="md-table-row">
            <md-table-cell md-label="">{{ terms.duration}}</md-table-cell>
            <md-table-cell md-label="">{{ terms.period}}</md-table-cell>
            <md-table-cell md-label="">{{ terms.cost}}</md-table-cell>
            <md-table-cell md-label="">{{ terms.link}}</md-table-cell>
            <md-table-cell md-label="">
              <md-button
                class="md-just-icon md-simple md-primary"
                @click="openTermsEdit(terms.id, terms.duration, terms.period, terms.cost, terms.link)"
              >
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Редагування</md-tooltip>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </transition>
    <TermsEdit
      ref="TermsEdit"
      @termsEdit="fetchTerms"
    />
  </div>

</template>

<script>
import api from "../../../config/config.js";
import CoursEdit from "@/components/Courses/CourseEdit.vue";
import TermsEdit from "@/components/Courses/TermsEdit.vue";

export default {
  name: "Terms-table",
  components: { CoursEdit, TermsEdit },

  data() {
    return {
      mdSelectedSingle: true,
      course: [],
      corseId: "",
      typesOfCourses: [],
      terms: [],
      termsIsVisible: false,
      title: "",
      courseTitle: "",
    };
  },
  methods: {
    async fetchTypesCourses() {
      await this.postData(
        `http://${api.host}:${api.port}/types_of_courses/read/`
      ).then((data) => {
        this.typesOfCourses = data;
      });
    },
    async fetchCourses(corseId = this.corseId) {
      await this.postData(
        `http://${api.host}:${api.port}/courses/read/${!corseId ? 1 : corseId}`
      ).then((data) => {
        this.course = data;
      });
    },
    async fetchTerms(id = 1) {
      await this.postData(
        `http://${api.host}:${api.port}/course_terms/read/${id}`
      ).then((data) => {
        this.terms = data;
      });
    },
    async postData(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
    },
    titleUpdate(title) {
      this.title = title;
    },
    async onDelete(id, login) {
      if (window.confirm(`Підтвердіть видалення користувача - ${login}`)) {
        await fetch(`http://${api.host}:${api.port}/camp/delete/${id}`, {
          method: "DELETE",
        });
        await this.postData(`http://${api.host}:${api.port}/camp/read/`).then(
          (data) => {
            this.camp = data;
          }
        );
      }
    },

    openFormEdit(id, title, table) {
      this.$refs.CoursEdit.show(id, title, table);
    },
    openTermsEdit(id, duration, period, cost, link) {
      console.log(id);
      this.$refs.TermsEdit.show(id, duration, period, cost, link);
    },
    closeForm() {
      this.isVisible = false;
    },
    getClass: ({ id }) => ({
      // 'md-primary': id === 2,
      // 'md-accent': id > 0
      "md-default": id > 0,
    }),
  },
  mounted() {
    // this.onSelect(this.selected);
    this.fetchCourses();
    this.fetchTypesCourses();
    this.fetchTerms();
  },
};
</script>
<style lang="scss" scoped>
.z-100 {
  z-index: 100;
}
.md-table + .md-table {
  margin-top: 16px;
}
.md-table.md-theme-default .md-table-row.md-selected-single {
  background-color: rgb(241, 240, 255);
}
hr {
  margin: 30px 0 30px;
}
.md-table-cell {
  padding: 0;
  height: 32px;
}
.md-button.md-just-icon {
  max-height: 28px;
}
.md-card .md-card-header .title,
.md-card .md-card-header .category {
  color: white;
}
.strong {
  font-weight: 900;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
