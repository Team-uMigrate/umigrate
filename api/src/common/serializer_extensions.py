from typing import List
from django.db.models import Model
from rest_framework import serializers


# An abstract model serializer class that allows for excluding fields and including related fields
class ModelSerializerExtension(serializers.ModelSerializer):
    class Meta:
        model: Model = None  # Must be overridden
        fields: List[str] or str = None  # Must be overridden
        extra_fields: List[str] = []
        exclude_fields: List[str] = []

    def get_field_names(self, declared_fields, info):
        fields = super(ModelSerializerExtension, self).get_field_names(
            declared_fields, info
        )

        # add the fields listed in the extra_fields list
        if getattr(self.Meta, "extra_fields", []):
            fields = fields + self.Meta.extra_fields

        # remove the fields listed in the exclude_fields list
        if getattr(self.Meta, "exclude_fields", []):
            fields = [
                field for field in fields if field not in self.Meta.exclude_fields
            ]

        return fields
