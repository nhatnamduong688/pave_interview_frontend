/**
 * Định nghĩa dữ liệu mẫu cho ứng dụng
 * File được tạo mới hoàn toàn để tránh lỗi cú pháp
 */

export const initialData = {
  options: {
    componentOptions: [
      { code: "DOOR_FRONT_LEFT", label: "Door Front Left", keyHint: "P" },
      { code: "FENDER_FRONT_LEFT", label: "Fender Front Left", keyHint: "P" },
      { code: "PILLAR_B_LEFT", label: "Pillar B Left", keyHint: "P" },
      { code: "QUARTER_PANEL_LEFT", label: "Quarter Panel Left", keyHint: "P" },
      { code: "ROCKER_PANEL_LEFT", label: "Rocker Panel Left", keyHint: "P" },
      { code: "ROOF_LINE_LEFT", label: "Roof Line Left", keyHint: "P" },
      { code: "PILLAR_COVER_REAR_LEFT", label: "Pillar Cover Rear Left", keyHint: "P" }
    ],
    materialOptions: [
      { code: "PAINT", label: "Paint", keyHint: "M" },
      { code: "TEXTURE_SURFACE", label: "Texture Surface", keyHint: "M" },
      { code: "CHROME", label: "Chrome", keyHint: "M" },
      { code: "STEEL", label: "Steel", keyHint: "M" }
    ],
    damageTypeOptions: [
      { code: "BENT", label: "Bent", keyHint: "D" },
      { code: "BROKEN", label: "Broken", keyHint: "D" },
      { code: "CHIPPED", label: "Chipped", keyHint: "D" },
      { code: "SEVERE_DAMAGE", label: "Severe Damage", keyHint: "D" },
      { code: "DENT", label: "Dent", keyHint: "D" },
      { code: "GOUGED", label: "Gouged", keyHint: "D" },
      { code: "HAIL_DAMAGE", label: "Hail Damage", keyHint: "D" }
    ],
    severityOptions: [
      { value: 1, label: "Min" },
      { value: 3, label: "Med" },
      { value: 5, label: "Maj" }
    ]
  },

  job: {
    id: "job-123",
    code: "TOA-8GASMDUDFT",
    projectTag: "AMZ P1",
    qcStatus: "QC Passed",
    qcPassedAt: "2025-05-02T15:03:58Z",
    durationSeconds: 32,
    photos: [
      {
        id: "photo-4",
        jobId: "job-123",
        viewName: "Left View",
        url: "/images/04-left-view.jpg",
        sequence: 4,
        annotations: [
          {
            id: "ann-1",
            photoId: "photo-4",
            components: ["QUARTER_PANEL_LEFT"],
            material: "PAINT",
            damageType: ["DENT"],
            score: 5,
            throughPaint: true,
            color: "#FF6384",
            shape: { type: "circle", x: 120, y: 200, radius: 10 },
            status: "included",
            createdBy: "user-1",
            createdAt: "2025-05-04T01:50:00Z"
          }
        ]
      }
    ]
  },

  ui: {
    selectedPhotoId: "photo-4",
    selectedAnnotationId: null,
    annotationInProgress: {
      photoId: null,
      shape: null,
      components: [],
      material: null,
      damageType: [],
      severity: null,
      throughPaint: false
    },
    finished: false
  }
};

// Type definitions using explicit interfaces instead of typeof
export type InitialDataType = typeof initialData;
export type OptionsState = typeof initialData.options;
export type JobState = typeof initialData.job;
export type UIState = typeof initialData.ui;

// Types for various entities with explicit definitions
export interface ComponentOption {
  code: string;
  label: string;
  keyHint: string;
}

export interface MaterialOption {
  code: string;
  label: string;
  keyHint: string;
}

export interface DamageTypeOption {
  code: string;
  label: string;
  keyHint: string;
  color?: string;
}

export interface SeverityOption {
  value: number;
  label: string;
}

export interface Shape {
  type: string;
  x: number;
  y: number;
  radius: number;
}

export interface Annotation {
  id: string;
  photoId: string;
  components: string[];
  material: string;
  damageType: string[];
  score: number;
  throughPaint: boolean;
  color: string;
  shape: Shape;
  status: string;
  createdBy: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  jobId: string;
  viewName: string;
  url: string;
  sequence: number;
  annotations: Annotation[];
}

export interface AnnotationInProgress {
  photoId: null | string;
  shape: null | Shape;
  components: string[];
  material: null | string;
  damageType: string[];
  severity: null | number;
  throughPaint: boolean;
} 