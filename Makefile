OUTPUT = just_note_button.zip

$(OUTPUT) :
	cd src && zip -r9q ../$@ .

.PHONY: $(OUTPUT)
