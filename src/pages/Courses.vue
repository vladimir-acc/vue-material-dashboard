<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-content>
            <CourseList table-header-color="blue" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import CourseList from "@/components/Courses/CourseList.vue";
export default {
  components: { CourseList },
};
</script>
