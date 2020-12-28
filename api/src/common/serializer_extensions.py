from typing import List
from django.db.models import Model
from rest_framework import serializers


# An abstract serializer class that allows for excluding fields and including related fields
class ModelSerializerExtension(serializers.ModelSerializer):
    class Meta:
        # Override required for model; it should be a model class
        model: Model = None
        # Override required for fields; it should be a list of fields for the model
        fields: List[str] or str = None
        # Override if there are addition fields to serialize
        extra_fields: List[str] = None
        # Override if there are fields that should not be serialized
        exclude_fields = []

    def get_field_names(self, declared_fields, info):
        fields = super(ModelSerializerExtension, self).get_field_names(
            declared_fields, info
        )

        if getattr(self.Meta, "extra_fields", None):
            fields = fields + self.Meta.extra_fields

        if getattr(self.Meta, "exclude_fields", []):
            fields = [
                field for field in fields if field not in self.Meta.exclude_fields
            ]

        return fields
